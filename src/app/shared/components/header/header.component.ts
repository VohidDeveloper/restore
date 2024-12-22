import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UserKeeperService } from 'src/app/core/services/user-keeper.service';
import { CloseMenuDirective } from '../../directives/close-menu.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CloseMenuDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly userService = inject(UserKeeperService);

  isUserMenuOpen = signal(false);
  credits = toSignal(this.userService.credits$);

  ngOnInit() {
    this.authService.authStatus
      .pipe(
        filter((status) => status),
        switchMap(() => {
          return this.apiService.getUser(this.storage.get('id') as string);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((res) => {
        this.userService.credits$.next(res.data.credits);
      });
  }

  authStatus = toSignal(this.authService.authStatus, {
    initialValue: false,
  });

  openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }

  toggleUserMenu() {
    this.isUserMenuOpen.set(!this.isUserMenuOpen());
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen.set(false);
    this.router.navigate(['']);
  }

  navigate(isHistoryTab: boolean) {
    this.router.navigate(['profile'], {
      queryParams: { isHistoryTab },
    });
    this.isUserMenuOpen.set(false);
  }
}
