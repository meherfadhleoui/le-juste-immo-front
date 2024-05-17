import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/shared/Validators/password-match';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.updateConfirmPasswordValidity();
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        confirmPasswordValidator(),
      ]),
    });
  }

  updateConfirmPasswordValidity() {
    this.resetPasswordForm
      .get('password')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resetPasswordForm.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return this.resetPasswordForm.markAllAsTouched();
    }

    this.isLoading = true;
    const token = this.activateRoute.snapshot.params['token'];
    const { password } = this.resetPasswordForm.value;

    this._authService.resetPassword(password, token).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        this._toastService.success(res.message);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
