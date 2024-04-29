import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Agency, User } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/core/auth/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/enums/role.enum';
import { DataService } from 'src/app/shared/services/data.service';
import { Country, FranceCity } from 'src/app/shared/models/address.model';
import {
  FRANCE_LABEL,
  buildCodeAndCity,
  getFranceCitiesModified,
} from 'src/app/shared/utils/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss'],
})
export class InformationsComponent implements OnInit {
  user!: User;
  form!: FormGroup;
  selectedFile?: File;
  imageUrl?: string;
  Role = Role;

  countries: Country[] = [];
  franceCities: (FranceCity & { codeAndCity: string })[] = [];
  FRANCE_LABEL = FRANCE_LABEL;

  selectedPhysicalCountry?: Country;
  selectedBillingCountry?: Country;
  physicalAddressSubscription?: Subscription;
  checkBoxValue = false;

  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private _dataService: DataService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initData();

    this._userService.user$.subscribe((user) => {
      this.user = user;
      this.initForm();
      this.patchForm();
    });
  }

  initData() {
    this.getCountries();
    this.getFranceCities();
  }

  getFranceCities() {
    this._dataService.getFranceCities().subscribe((franceCities) => {
      this.franceCities = getFranceCitiesModified(franceCities);
    });
  }

  getCountries() {
    this._dataService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  initForm() {
    if (this.user.role === Role.Particulier) {
      return this.initParticulierForm();
    }

    this.initAgencyForm();
  }

  initParticulierForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      address: this.fb.group({
        pays: this.fb.control('', Validators.required),
        city: this.fb.control('', Validators.required),
        libelleVoie: this.fb.control(''),
        codePostal: this.fb.control(''),
      }),
      phone: this.fb.control(null, [Validators.required]),
    });
  }

  initAgencyForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.group({
        pays: this.fb.control('', Validators.required),
        city: this.fb.control('', Validators.required),
        libelleVoie: this.fb.control(''),
        codePostal: this.fb.control(''),
      }),
      siret: this.fb.control('', [Validators.required]),
      nomAgence: this.fb.control(''),
      billingAddress: this.fb.group({
        pays: this.fb.control('', Validators.required),
        city: this.fb.control('', Validators.required),
        libelleVoie: this.fb.control(''),
        codePostal: this.fb.control(''),
      }),
      phone: this.fb.control(null, Validators.required),
    });
  }

  patchForm() {
    const user = structuredClone(this.user);

    if (user.address.pays === this.FRANCE_LABEL) {
      const { codePostal, city } = user.address;
      user.address.city = buildCodeAndCity(codePostal, city);
    }

    if (this.user.role === Role.Particulier) {
      this.form.patchValue({ ...user });
      return;
    }

    const agency = user as Agency;

    if (agency.billingAddress.pays === this.FRANCE_LABEL) {
      const { codePostal, city } = agency.billingAddress;
      agency.billingAddress.city = buildCodeAndCity(codePostal, city);
    }

    this.form.patchValue({ ...agency });
  }

  onPhysicalFranceCityChanged(codePostal: string) {
    this.form.patchValue({
      address: {
        codePostal,
      },
    });
  }

  onBillingFranceCityChanged(codePostal: string) {
    this.form.patchValue({
      billingAddress: {
        codePostal,
      },
    });
  }

  onPhysicalCountryChanged(selectedCountry: Country) {
    if (selectedCountry.id !== this.selectedPhysicalCountry?.id) {
      this.form.patchValue({
        address: {
          city: '',
          codePostal: '',
        },
      });
    }

    this.selectedPhysicalCountry = selectedCountry;
  }

  onBillingCountryChanged(selectedBillingCountry: Country) {
    if (selectedBillingCountry.id !== this.selectedBillingCountry?.id) {
      this.form.patchValue({
        billingAddress: {
          city: '',
          codePostal: '',
        },
      });
    }

    this.selectedBillingCountry = selectedBillingCountry;
  }

  onCheckboxChange(checkboxChangeEvent: CheckboxChangeEvent) {
    this.form.markAsDirty();
    if (checkboxChangeEvent.checked) {
      return this.updateBillingAddress();
    }

    this.stopUpdatingBillingAddress();
  }

  updateBillingAddress() {
    const physicalAddress = this.form.get('address');
    const billingAddress = this.form.get('billingAddress');

    this.selectedBillingCountry = this.selectedPhysicalCountry;
    billingAddress?.patchValue({ ...physicalAddress?.value });
    billingAddress?.disable();

    this.physicalAddressSubscription = physicalAddress?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((address) => {
        billingAddress?.patchValue(address);

        setTimeout(() => {
          this.selectedBillingCountry = this.selectedPhysicalCountry;
        }, 0);
      });
  }

  stopUpdatingBillingAddress() {
    this.physicalAddressSubscription?.unsubscribe();
    this.form.get('billingAddress')?.enable();
  }

  // Image upload

  onImageUpload(event: any) {
    this.selectedFile = <File>event.target.files[0];

    if (this.selectedFile) {
      this.form.markAsDirty();
      this.imageUrl = URL.createObjectURL(this.selectedFile);
      return;
    }

    this.imageUrl = undefined;
  }

  onImageCancel(fileInputElement: HTMLInputElement) {
    fileInputElement.value = '';
    this.selectedFile = undefined;
    this.imageUrl = '';
  }

  submit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.isLoading = true;

    const formValues = this.form.getRawValue();

    if (formValues.address.pays === this.FRANCE_LABEL) {
      formValues.address.city = formValues.address.city.split(' - ')[1];
    }

    if (
      this.user.role === Role.Agence &&
      formValues.billingAddress.pays === this.FRANCE_LABEL
    ) {
      formValues.billingAddress.city =
        formValues.billingAddress.city.split(' - ')[1];
    }

    const formData = new FormData();

    Object.entries(formValues as Object).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
        return;
      }

      formData.append(key, value);
    });

    if (this.selectedFile && this.imageUrl) {
      formData.append('avatar', this.selectedFile);
    }

    this._userService.update(this.user._id, formData).subscribe({
      next: (res) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.checkBoxValue = false;
        this.isLoading = false;
        this.selectedFile = undefined;
        this.imageUrl = undefined;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: res.message,
        });
      },
      error: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isLoading = false;
      },
    });
  }
}
