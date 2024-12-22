import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(
  nameRe: RegExp,
  errorName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = nameRe.test(control.value);
    return isValid ? null : { [errorName]: true };
  };
}

export function confirmPasswordValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { match: true };
  };
}
