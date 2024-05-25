import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, FranceCity } from 'src/app/shared/models/address.model';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  buildCodeAndCity,
  getFranceCitiesModified,
} from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnChanges {
  countries: Country[] = [];
  franceCities: (FranceCity & { codeAndCity: string })[] = [];
  addressForm!: FormGroup;
  @Input() isEdit = false;
  @Input() annonce!: Annonce;

  constructor(
    private _dataService: DataService,
    private fb: FormBuilder,
  ) {}

  ngOnChanges(): void {
    if (this.isEdit && this.annonce.adresseBien) {
      this.patchForm();
    }
  }

  patchForm() {
    const adresse = this.annonce.adresseBien.adresse;
    const codePostal = this.annonce.adresseBien.codePostal;
    const ville = this.annonce.adresseBien.ville;

    this.addressForm?.patchValue({
      ville: buildCodeAndCity(codePostal, ville),
      adresse,
      codePostal,
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getFranceCities();
  }

  initForm() {
    this.addressForm = this.fb.group({
      ville: this.fb.control('', Validators.required),
      adresse: this.fb.control('', Validators.required),
      codePostal: this.fb.control(''),
    });
  }

  getFranceCities() {
    this._dataService.getFranceCities().subscribe((franceCities) => {
      this.franceCities = getFranceCitiesModified(franceCities);
    });
  }

  onFranceCityChanged(codePostal: string) {
    this.addressForm.patchValue({
      codePostal,
    });
  }

  getValue() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return null;
    }

    const adresseBien = structuredClone(this.addressForm.value);

    adresseBien.ville = adresseBien.ville.split(' - ')[1];

    return { adresseBien };
  }
}
