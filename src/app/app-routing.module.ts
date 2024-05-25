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
        path: 'annonce/:id',
        loadComponent: () =>
          import('./client/annonce-viewer/annonce-viewer.component').then(
            (mod) => mod.AnnonceViewerComponent,
          ),
      },
    ],
  },

  {
    path: 'create-annonce',
    loadComponent: () =>
      import('./client/annonce/annonce.component').then(
        (mod) => mod.CreateAnnonceComponent,
      ),

    canActivate: [authGuard],
  },

  {
    path: 'edit-annonce/:id',
    loadComponent: () =>
      import('./client/annonce/annonce.component').then(
        (mod) => mod.CreateAnnonceComponent,
      ),

    canActivate: [authGuard],
    data: { isEdit: true },
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
