import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollToFirstInvalidElement(form: FormGroup, extraSpace: number): void {
    const invalidControl = this.findFirstInvalidControl(form);
    if (invalidControl) {
      const invalidElement = document.querySelector(
        '[formControlName="' + invalidControl + '"]',
      );

      if (invalidElement) {
        const scrollTopPosition =
          invalidElement.getBoundingClientRect().top +
          window.pageYOffset -
          extraSpace;

        window.scrollTo({ top: scrollTopPosition, behavior: 'smooth' });
      }
    }
  }

  private findFirstInvalidControl(formGroup: FormGroup): any {
    for (const controlName in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlName)) {
        const control = formGroup.get(controlName);

        if (control instanceof FormGroup) {
          const nestedInvalidControl = this.findFirstInvalidControl(control);
          if (nestedInvalidControl) {
            return nestedInvalidControl;
          }
        }

        if (control?.invalid) {
          return controlName;
        }
      }
    }
    return null;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
