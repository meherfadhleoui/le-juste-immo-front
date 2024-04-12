import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './core/auth/auth-routing.module';

const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.component').then((mod) => mod.WelcomeComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
