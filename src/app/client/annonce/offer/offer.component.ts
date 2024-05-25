import { Component, Input, OnChanges } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/app/shared/enums/offer.enum';
import { Annonce } from 'src/app/shared/models/annonce.model';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnChanges {
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  selectedOffer? = '';
  offerForm = new FormGroup({
    typeOffre: new FormControl('', Validators.required),
  });

  types: string[] = Object.values(Offer);

  ngOnChanges(): void {
    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.offerForm.patchValue({ typeOffre: this.annonce.typeOffre });
    this.selectedOffer = this.annonce.typeOffre;
  }

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
