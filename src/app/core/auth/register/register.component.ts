import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Role } from 'src/app/shared/enums/role.enum';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from 'src/app/shared/Validators/password-match';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { Country, FranceCity } from 'src/app/shared/models/address.model';
import {
  FRANCE_LABEL,
  getFranceCitiesModified,
} from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  Role = Role;
  selectedRole: Role = Role.Particulier;
  registerRoleOptions: SelectItem[] = [
    { label: Role.Particulier, value: Role.Particulier, icon: 'pi pi-user' },
    { label: Role.Agence, value: Role.Agence, icon: 'pi pi-building' },
  ];

  countries: Country[] = [];
  franceCities: (FranceCity & { codeAndCity: string })[] = [];
  selectedBillingCountry?: any;
  physicalAddressSubscription?: Subscription;
  FRANCE_LABEL = FRANCE_LABEL;

  selectedPhysicalCountry?: Country;
  selectedPhysicalFrenchCity?: FranceCity & { codeAndCity: string };

  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.initParticulierForm();
    this.updateConfirmPasswordValidity();
    this.initData();
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

  initParticulierForm() {
    this.registerForm = this.fb.group({
      role: this.fb.control(Role.Particulier),
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        confirmPasswordValidator(),
      ]),
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
    this.registerForm = this.fb.group({
      role: this.fb.control(Role.Agence),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        confirmPasswordValidator(),
      ]),
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

  updateConfirmPasswordValidity() {
    this.registerForm
      .get('password')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.registerForm.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  onRoleChange(role: Role) {
    this.selectedRole = role;
    if (this.selectedRole === Role.Particulier) {
      this.stopUpdatingBillingAddress();
      return this.initParticulierForm();
    }

    this.initAgencyForm();
  }

  onPhysicalCountryChanged(selectedCountry: Country) {
    if (selectedCountry.id !== this.selectedPhysicalCountry?.id) {
      this.registerForm.patchValue({
        address: {
          city: '',
          codePostal: '',
        },
      });
    }

    this.selectedPhysicalCountry = selectedCountry;
  }

  onPhysicalFranceCityChanged(codePostal: string) {
    this.registerForm.patchValue({
      address: {
        codePostal,
      },
    });
  }

  onBillingFranceCityChanged(codePostal: string) {
    this.registerForm.patchValue({
      billingAddress: {
        codePostal,
      },
    });
  }

  onBillingCountryChanged(selectedBillingCountry: Country) {
    if (selectedBillingCountry.id !== this.selectedBillingCountry?.id) {
      this.registerForm.patchValue({
        billingAddress: {
          city: '',
          codePostal: '',
        },
      });
    }

    this.selectedBillingCountry = selectedBillingCountry;
  }

  onCheckboxChange(checkboxChangeEvent: CheckboxChangeEvent) {
    if (checkboxChangeEvent.checked) {
      return this.updateBillingAddress();
    }

    this.stopUpdatingBillingAddress();
  }

  updateBillingAddress() {
    const physicalAddress = this.registerForm.get('address');
    const billingAddress = this.registerForm.get('billingAddress');

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
    this.registerForm.get('billingAddress')?.enable();
  }

  submit() {
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }

    this.isLoading = true;
    const { confirmPassword, ...registerFormValues } =
      this.registerForm.getRawValue();

    if (registerFormValues.address.pays === this.FRANCE_LABEL) {
      registerFormValues.address.city =
        registerFormValues.address.city.split(' - ')[1];
    }

    if (
      registerFormValues.role === Role.Agence &&
      registerFormValues.billingAddress.pays === this.FRANCE_LABEL
    ) {
      registerFormValues.billingAddress.city =
        registerFormValues.billingAddress.city.split(' - ')[1];
    }

    this._authService
      .register(registerFormValues)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/confirmation-required']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.physicalAddressSubscription?.unsubscribe();
  }
}
