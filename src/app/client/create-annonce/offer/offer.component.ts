import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  selectedOffer = null;
  offerForm = new FormGroup({
    typeOffre: new FormControl('', Validators.required),
  });

  types = [
    {
      name: 'À louer',
      value: 'Location',
    },
    {
      name: 'À vendre',
      value: 'Vente',
    },
  ];

  getValue() {
    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      return null;
    }

    return this.offerForm.value;
  }

  selectRadioButton(value: any) {
    this.selectedOffer = value;
    this.offerForm.get('typeOffre')?.patchValue(value);
  }
}
