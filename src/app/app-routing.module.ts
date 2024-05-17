import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './core/auth/auth-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { PROFILE_ROUTE } from './client/profile/profile-route';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./client/home/home.component').then(
            (mod) => mod.HomeComponent,
          ),
      },
      PROFILE_ROUTE,

      {
        path: 'agency',
        loadComponent: () =>
          import('./client/agency/agency.component').then(
            (mod) => mod.AgencyComponent,
          ),
      },

      {
        path: 'annonce',
        loadComponent: () =>
          import('./client/annonce/annonce.component').then(
            (mod) => mod.AnnonceComponent,
          ),

        children: [
          {
            path: ':id',
            loadComponent: () =>
              import('./client/annonce/details/details.component').then(
                (mod) => mod.DetailsComponent,
              ),
          },
        ],
      },
    ],
  },

  {
    path: 'create-annonce',
    loadComponent: () =>
      import('./client/create-annonce/create-annonce.component').then(
        (mod) => mod.CreateAnnonceComponent,
      ),

    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
