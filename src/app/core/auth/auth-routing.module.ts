import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from '../guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((mod) => mod.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(
            (mod) => mod.RegisterComponent,
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (mod) => mod.ForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import('./reset-password/reset-password.component').then(
            (mod) => mod.ResetPasswordComponent,
          ),
      },
      {
        path: 'account-verification/:token',
        loadComponent: () =>
          import('./account-verification/account-verification.component').then(
            (mod) => mod.AccountVerificationComponent,
          ),
      },
      {
        path: 'confirmation-required',
        loadComponent: () =>
          import('./confirmaton-required/confirmaton-required.component').then(
            (mod) => mod.ConfirmatonRequiredComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
