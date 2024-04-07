import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/register/register.component').then(
        (mod) => mod.RegisterComponent,
      ),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./core/auth/forgot-password/forgot-password.component').then(
        (mod) => mod.ForgotPasswordComponent,
      ),
  },

  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./core/auth/reset-password/reset-password.component').then(
        (mod) => mod.ResetPasswordComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
