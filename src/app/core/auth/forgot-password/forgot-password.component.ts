import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  mailSent = false;
  message = '';
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return this.forgotPasswordForm.markAllAsTouched();
    }

    this.isLoading = true;

    this._authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.message = res.message;
        this.mailSent = true;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
