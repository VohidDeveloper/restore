import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { imgTypes } from 'shared/constants';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserKeeperService } from 'src/app/core/services/user-keeper.service';
import { FaqComponent } from 'src/app/shared/components/faq/faq.component';
import { PrivilegesComponent } from 'src/app/shared/components/privileges/privileges.component';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [PrivilegesComponent, FaqComponent, MatProgressSpinnerModule],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerationComponent {
  private readonly imgTypes = imgTypes;
  private readonly maxFileSize = 5 * 1024 * 1024;
  private readonly fileReader = new FileReader();

  originFileUrl = signal('none');
  generatedFileUrl = signal('none');
  format = signal<'jpg' | 'png'>('jpg');

  isError = signal(false);
  loading = signal(false);
  isDragOver = signal(false);
  isUploadStart = signal(false);
  isOriginalBlockVisible = signal(true);
  isOriginalFileUpLoad = computed(
    () => this.originFileUrl() !== 'none' && !this.isError(),
  );

  private file: File | null = null;
  private fileName: string | null = null;
  private fileBase64: string | null = null;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiService = inject(ApiService);
  private readonly storage = inject(StorageService);
  private readonly document = inject(DOCUMENT);
  private readonly userService = inject(UserKeeperService);

  constructor() {
    this.fileReader.onload = () => this.setOriginFileUrl();
  }

  get accept(): string {
    return this.imgTypes.join(', ');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    this.isError.set(false);
    this.isDragOver.set(false);
    this.isUploadStart.set(false);

    const files = event.dataTransfer?.files;

    this.reset();
    this.validateFile(files);
  }

  onFileSelect(event: Event) {
    const { files } = event.target as HTMLInputElement;

    this.isError.set(false);
    this.isUploadStart.set(false);
    this.reset();
    this.validateFile(files);
  }

  reset(): void {
    this.originFileUrl.set('none');
    this.generatedFileUrl.set('none');

    this.file = null;
    this.fileName = null;
    this.fileBase64 = null;
  }

  download(): void {
    if (this.fileBase64 && this.fileName) {
      const type = 'image/' + this.format();
      const byteCharacters = atob(this.fileBase64);
      const byteArray = Uint8Array.from(byteCharacters, (c) => c.charCodeAt(0));
      const blob = new Blob([byteArray], { type });
      const link = this.document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = `${this.fileName}.${this.format()}`;
      link.click();
    }
  }

  setOriginalBlockVisibility(value: boolean): void {
    this.isOriginalBlockVisible.set(value);
  }

  setFormat(format: 'jpg' | 'png'): void {
    this.format.set(format);
  }

  private validateFile(files: FileList | undefined | null): void {
    if (files && files.length > 0) {
      this.readeFile(files[0]);
      this.file = files[0];
    }
  }

  generate(): void {
    if (this.userService.credits$.value <= 0) {
      this.router.navigate(['profile'], {
        queryParams: { isHistoryTab: false },
      });
    }

    const id = this.storage.get('id');

    this.isUploadStart.set(true);

    if (id && this.file) {
      this.loading.set(true);
      this.apiService
        .generate(this.file, id)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              this.fileName = res.data.file_name;
              this.fileBase64 = res.data.file_base64;
              this.originFileUrl.set(this.createUrl(res.data.original));
              this.generatedFileUrl.set(this.createUrl(res.data.generated));
              this.userService.credits$.next(res.data.remaining_credits);
            }
          },
          error: () => this.isError.set(true),
        });
    }
  }

  private readeFile(file: File): void {
    if (this.imgTypes.includes(file.type) && this.maxFileSize > file.size) {
      if (this.fileReader.readyState === 1) {
        this.fileReader.abort();
      }
      this.fileReader.readAsDataURL(file);
    }
  }

  private setOriginFileUrl(): void {
    const { result } = this.fileReader;
    const url = this.createUrl(result as string);

    this.originFileUrl.set(url);
  }

  private createUrl(value: string): string {
    return `url('${value}')`;
  }
}
