import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { AuthCoverComponent } from '../../components/auth-cover/auth-cover.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ACCESS_TOKEN_KEY, Steps } from 'shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../core/services/storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthBody } from '../../models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [AuthCoverComponent, LoginFormComponent, MatProgressSpinnerModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  step = signal(0);
  loading = signal(false);
  isPasswordVisible = signal(false);

  createdEmail = '';
  resetPasswordEmail = '';
  readonly steps = Steps;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  setStep(step: number): void {
    this.step.set(step);
  }

  close(confirmEmail = false): void {
    this.dialogRef.close(confirmEmail);
  }

  login({ email, password }: Partial<AuthBody>): void {
    if (email && password) {
      this.loading.set(true);
      this.authService
        .authenticateUser({ email, password })
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              this.openSnackBar(res.message);
              this.storage.set(ACCESS_TOKEN_KEY, res.data.token);
              this.storage.set('id', res.data.user.id);
              this.close();
              this.authService.checkAuthStatus();
              this.router.navigate(['generation']);
            }
          },
          error: (err) => this.openSnackBar(err.error.message),
        });
    }
  }

  checkEmail({ email }: Partial<AuthBody>): void {
    if (email) {
      this.loading.set(true);
      this.authService
        .checkEmail(email)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res?.data.validEmail) {
              this.createdEmail = email;
              this.setStep(this.steps.ENTER_PASSWORD);
              this.openSnackBar(res.message);
            }
          },
          error: (err) => this.openSnackBar(err.error.message),
        });
    }
  }

  create({ password }: Partial<AuthBody>): void {
    if (this.createdEmail && password) {
      this.loading.set(true);
      this.authService
        .registerUser({ email: this.createdEmail, password })
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              this.createdEmail = '';
              this.close();
              this.storage.set(ACCESS_TOKEN_KEY, res.data.token);
              this.storage.set('id', res.data.user.id);
              this.openSnackBar(res.message);
              this.authService.checkAuthStatus();
            }
          },
          error: (err) => this.openSnackBar(err.error.message),
        });
    }
  }

  sendResetLink({ email }: Partial<AuthBody>): void {
    if (email) {
      this.resetPasswordEmail = email;
      this.loading.set(true);
      this.authService
        .sendResetLink(email)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              this.openSnackBar(res.message);
              this.setStep(this.steps.RESET_LINK);
            }
          },
          error: (err) => this.openSnackBar(err.error.message),
        });
    }
  }

  sentLinkAgain(): void {
    const email = this.resetPasswordEmail;
    if (this.resetPasswordEmail) {
      this.sendResetLink({ email });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }
}
