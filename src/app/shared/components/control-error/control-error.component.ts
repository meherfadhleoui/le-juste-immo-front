import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
})
export class ControlErrorComponent {
  @Input() control!: AbstractControl | null;

  ERROR_MESSAGE: any = {
    required: () => `Ce champ est obligatoire`,
    email: () => 'Veuillez entrer un e-mail valide.',
    maxlength: (e: any) => `Ce champ contient ${e.requiredLength} maximum`,
    minlength: (e: any) => `Ce champ contient ${e.requiredLength} minimum`,
    PasswordNoMatch: () => 'Les mots de passe ne correspondent pas.',
    default: () => "Message d'erreur non défini pour cette validation.",
  };

  shouldShowErrors(): boolean {
    if (!this.control) return false;

    return this.control.invalid && this.control.touched;
  }

  getErrorMessage() {
    if (!this.control) return '';

    const errorKeys = Object.keys(this.control.errors || {});

    if (errorKeys.length === 0) return '';

    const errorKey = errorKeys[0];
    const errorMessageFunction = this.ERROR_MESSAGE[errorKey];

    if (errorMessageFunction) {
      return errorMessageFunction(this.control.getError(errorKey));
    }

    // If no specific message is defined for the error key,
    // return a default message
    return this.ERROR_MESSAGE.default();
  }
}
