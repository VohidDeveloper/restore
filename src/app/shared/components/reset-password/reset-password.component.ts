import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { AuthCoverComponent } from '../auth-cover/auth-cover.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  confirmPasswordValidator,
  passwordValidator,
} from 'src/app/core/validators/password-validator';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [AuthCoverComponent, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  loading = signal(false);
  isPasswordHidden = signal(true);

  token = input.required<string>();

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordValidator(/\d/, 'number'),
          passwordValidator(/[A-Z]/, 'letter'),
        ],
      ],
      confirmPassword: [''],
    },
    {
      validators: confirmPasswordValidator(),
    },
  );

  resetPassword(): void {
    const password = this.form.controls.password.value as string;
    if (this.token() && password) {
      this.loading.set(true);
      this.authService
        .resetPassword(this.token(), password)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              this.openSnackBar(res.message);
              this.router.navigate([]);
            }
          },
          error: (err) => this.openSnackBar(err.error.message),
        });
    }
  }

  toggleVisibility(): void {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }
}
