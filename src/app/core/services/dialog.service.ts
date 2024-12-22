import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmEmailDialogComponent } from 'src/app/shared/dialogs/confirm-email-dialog/confirm-email-dialog.component';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openLoginDialog(): void {
    this.dialog
      .open(LoginDialogComponent, {
        width: '831px',
        autoFocus: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.openConfirmEmailDialog();
        }
      });
  }

  openConfirmEmailDialog(): void {
    this.dialog.open(ConfirmEmailDialogComponent, {
      width: '424px',
      autoFocus: true,
    });
  }
}
