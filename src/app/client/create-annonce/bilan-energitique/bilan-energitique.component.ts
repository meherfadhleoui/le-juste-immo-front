import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { PIcon } from 'src/app/shared/enums/icons.enum';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-bilan-energitique',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bilan-energitique.component.html',
  styleUrls: ['./bilan-energitique.component.scss'],
})
export class BilanEnergitiqueComponent implements OnInit {
  form = new FormGroup({
    state: new FormControl(null, Validators.required),
    consommationEnergetique: new FormControl(0),
    emissionsGaz: new FormControl(0),
    dateRealisation: new FormControl(''),
    empty: new FormControl(false),
  });

  messages: Message[] = [
    {
      icon: PIcon.info,
      severity: 'info',
      summary: 'Renseignez votre diagnostic après publication',
      detail:
        "Depuis janvier 2022, il est obligatoire d'afficher votre DPE sur votre annonce pour louer un bien. Ces informations jouent également un rôle clé dans la prise de décision des locataires.",
    },

    {
      icon: PIcon.info,
      severity: 'info',
      summary: 'Communiquez votre DPE pour plus de transparence',
      detail:
        "Depuis janvier 2022, il est obligatoire d'afficher votre DPE sur votre annonce pour louer un bien. Ces informations jouent également un rôle clé dans la prise de décision des locataires.",
    },

    {
      icon: PIcon.warn,
      severity: 'warn',
      summary: 'Etes-vous sûr de ne pas être soumis au DPE ?',
      detail:
        'Pour savoir si votre bien entre dans la catégorie des logements non soumis au DPE, rendez-vous sur le site du gouvernement.',
    },
  ];

  state?: number;

  ngOnInit(): void {
    this.subscribeToConsommationEnergetiqueValueChange();
  }

  subscribeToConsommationEnergetiqueValueChange() {
    this.form.get('state')?.valueChanges.subscribe((state: any) => {
      this.state = state;
      this.resetInitialFormValue();
      this.form.patchValue({ empty: false });
    });
  }

  resetInitialFormValue() {
    this.form.patchValue({
      consommationEnergetique: 0,
      emissionsGaz: 0,
      dateRealisation: '',
    });
  }

  getValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return null;
    }

    return { dpe: this.form.value };
  }
}
