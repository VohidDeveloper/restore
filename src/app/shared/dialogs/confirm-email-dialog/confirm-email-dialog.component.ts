import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-email-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-email-dialog.component.html',
  styleUrl: './confirm-email-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<ConfirmEmailDialogComponent>,
  );

  close(): void {
    this.dialogRef.close();
  }
}
