import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksComponent {
  private readonly dialogRef = inject(MatDialogRef<ThanksComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
