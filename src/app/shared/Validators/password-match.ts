import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// export const confirmPasswordValidatora: ValidatorFn = (
//   control: AbstractControl,
// ): ValidationErrors | null => {
//   const passwordControl = control.parent?.get('password');
//   const confirmPasswordControl = control;

//   if (!passwordControl || !confirmPasswordControl) {
//     return null;
//   }

//   return passwordControl.value === confirmPasswordControl.value
//     ? null
//     : { PasswordNoMatch: true };
// };

export function confirmPasswordValidator(
  passwordFieldName: string = 'password',
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.parent?.get(passwordFieldName);
    const confirmPasswordControl = control;

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    return passwordControl.value === confirmPasswordControl.value
      ? null
      : { PasswordNoMatch: true };
  };
}
