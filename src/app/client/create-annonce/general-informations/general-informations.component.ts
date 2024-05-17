import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-informations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss'],
})
export class GeneralInformationsComponent {
  form = new FormGroup({
    titre: new FormControl('', Validators.required),
    etat: new FormControl('', Validators.required),
    descriptionDetaillee: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  etats = ['Occasion', 'Neuf ', 'Semi-fini'];

  getValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    return this.form.value;
  }
}
