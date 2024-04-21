import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Role } from 'src/app/shared/enums/role.enum';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';
import { COUNTRIES } from 'src/app/shared/constants/countries';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Country } from 'src/app/shared/models/country.model';
import { confirmPasswordValidator } from 'src/app/shared/Validators/password-match';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { Subscription } from 'rxjs';

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

  countries = COUNTRIES;
  selectedPhysicalCountry?: Country;
  selectedBillingCountry?: Country;
  physicalAddressSubscription?: Subscription;

  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.updateConfirmPasswordValidity();
  }

  initUserForm() {
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
        confirmPasswordValidator,
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
        confirmPasswordValidator,
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
      return this.initUserForm();
    }

    this.initAgencyForm();
  }

  onPhysicalCountryChanged(event: DropdownChangeEvent) {
    this.selectedPhysicalCountry = event.value;
  }

  onBillingCountryChanged(event: DropdownChangeEvent) {
    this.selectedBillingCountry = event.value;
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

    registerFormValues.address.pays = registerFormValues.address.pays.name;
    if (this.selectedRole === Role.Agence) {
      registerFormValues.billingAddress.pays =
        registerFormValues.billingAddress.pays.name;
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
