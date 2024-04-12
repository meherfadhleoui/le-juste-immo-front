import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const passwordControl = control.parent?.get('password');
  const confirmPasswordControl = control;

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  return passwordControl.value === confirmPasswordControl.value
    ? null
    : { PasswordNoMatch: true };
};
