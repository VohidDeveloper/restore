import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Step } from 'shared/constants';
import { AuthBody } from '../../models';
import { passwordValidator } from 'src/app/core/validators/password-validator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  isPasswordHidden = signal(true);

  step = input.required<Step>();
  title = input.required<string>();
  subtitle = input.required<string>();
  buttonText = input.required<string>();

  back = output();
  submit = output<Partial<AuthBody>>();
  forgotPassword = output<void>();

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        passwordValidator(/\d/, 'number'),
        passwordValidator(/[A-Z]/, 'letter'),
      ],
    ],
  });

  get control(): FormGroup | FormControl {
    const step = this.step();

    if (step === 'email-password') {
      return this.form;
    } else if (step === 'password') {
      return this.form.controls.password;
    } else {
      return this.form.controls.email;
    }
  }

  toggleVisibility(): void {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  submitForm(): void {
    const value = this.form.value as Partial<AuthBody>;
    this.submit.emit(value);
  }

  reset(): void {
    this.form.reset();
  }
}
