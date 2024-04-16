import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initloginForm();
  }

  initloginForm() {
    this.loginForm = new FormGroup({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.isLoading = true;
    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
