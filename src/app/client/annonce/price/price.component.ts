import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { PIcon } from 'src/app/shared/enums/icons.enum';
import { Offer } from 'src/app/shared/enums/offer.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { User } from 'src/app/shared/models/user.models';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnChanges {
  @Input() user!: User;
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  priceForm!: FormGroup;
  PIcon = PIcon;
  Role = Role;
  Object = Object;
  Offer = Offer;

  @Input() offerType = '';
  mentionValues: Record<string, string[]> = {
    [this.Offer.Vente]: ['TTC', 'HT'],
    [this.Offer.Location]: ['HC', 'CC'],
  };

  ngOnChanges(): void {
    this.initForm();
    this.checkMentionControl();
    this.checkTaxeFonciereControl();
    this.checkDepotDeGarantie();
    this.checkFraisEtatLieu();

    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.priceForm.patchValue(this.annonce);
  }

  initForm() {
    this.priceForm = new FormGroup({
      informationsFinanciers: new FormGroup({
        montant: new FormControl(null, Validators.required),
        chargesCopropriete: new FormControl(null, Validators.required),
        mention: new FormControl(null, Validators.required),
        taxeFonciere: new FormControl(null, Validators.required),
        depotDeGarantie: new FormControl(null, Validators.required),
      }),
    });

    if (this.user.role !== Role.Agence) {
      return;
    }

    // Agency
    const honorairesAgenceFormGroup = new FormGroup({
      montant: new FormControl(null, Validators.required),
      Vendeur: new FormControl(null, Validators.required),
      Acquereur: new FormControl(null, Validators.required),
      fraisEtatLieu: new FormControl(null),
    });

    this.priceForm.addControl('honorairesAgence', honorairesAgenceFormGroup);
  }

  checkMentionControl() {
    const mentionControl = this.priceForm.get('informationsFinanciers.mention');

    if (Object.keys(this.mentionValues).includes(this.offerType)) {
      mentionControl?.addValidators(Validators.required);
    } else {
      mentionControl?.removeValidators(Validators.required);
    }

    mentionControl?.patchValue(null);
    mentionControl?.updateValueAndValidity();
  }

  checkTaxeFonciereControl() {
    const taxeFonciereControl = this.priceForm.get(
      'informationsFinanciers.taxeFonciere',
    );

    if (this.offerType === this.Offer.Vente) {
      taxeFonciereControl?.removeValidators(Validators.required);
    } else {
      taxeFonciereControl?.addValidators(Validators.required);
    }

    taxeFonciereControl?.patchValue(null);
    taxeFonciereControl?.updateValueAndValidity();
  }

  checkDepotDeGarantie() {
    const depotDeGarantie = this.priceForm.get(
      'informationsFinanciers.depotDeGarantie',
    );

    if (this.offerType === this.Offer.Location) {
      depotDeGarantie?.removeValidators(Validators.required);
    } else {
      depotDeGarantie?.addValidators(Validators.required);
    }

    depotDeGarantie?.patchValue(null);
    depotDeGarantie?.updateValueAndValidity();
  }

  checkFraisEtatLieu() {
    const fraisEtatLieu = this.priceForm.get('honorairesAgence.fraisEtatLieu');

    if (this.offerType === this.Offer.Location) {
      fraisEtatLieu?.addValidators(Validators.required);
    } else {
      fraisEtatLieu?.removeValidators(Validators.required);
    }

    fraisEtatLieu?.patchValue(null);
    fraisEtatLieu?.updateValueAndValidity();
  }

  onInputNumberChange(event: InputNumberInputEvent, controlName: string) {
    this.priceForm.get(controlName)?.patchValue(100 - Number(event.value));
  }

  getValue() {
    if (this.priceForm.invalid) {
      this.priceForm.markAllAsTouched();
      return null;
    }

    const formValues: any = structuredClone(this.priceForm.value);

    formValues.informationsFinanciers = this.removeEmptyProperties(
      formValues.informationsFinanciers,
    );

    if (this.user.role === Role.Agence) {
      formValues.honorairesAgence = this.removeEmptyProperties(
        formValues.honorairesAgence,
      );
    }

    return formValues;
  }

  removeEmptyProperties(obj: Object) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== null && value !== '',
      ),
    );
  }
}
