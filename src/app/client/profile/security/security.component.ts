import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/auth/user.service';
import { confirmPasswordValidator } from 'src/app/shared/Validators/password-match';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.updateConfirmNewPasswordValidity();
  }

  initForm() {
    this.form = this.fb.group({
      currentPassword: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmNewPassword: this.fb.control('', [
        Validators.required,
        confirmPasswordValidator('newPassword'),
      ]),
    });
  }

  updateConfirmNewPasswordValidity() {
    this.form
      .get('newPassword')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.get('confirmNewPassword')?.updateValueAndValidity();
      });
  }

  submit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.isLoading = true;
    const { confirmNewPassword, ...formValues } = this.form.value;

    this._userService.changePassword(formValues).subscribe({
      next: (res) => {
        this.form.reset();
        this.isLoading = false;
        this._toastService.success(res.message);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
