import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './core/auth/auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { PROFILE_ROUTE } from './modules/user/profile/profile-route';

const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./modules/user/home/home.component').then(
            (mod) => mod.HomeComponent,
          ),
      },
      PROFILE_ROUTE,
    ],
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
