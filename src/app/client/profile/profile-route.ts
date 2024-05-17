import { Route } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./profile.component').then((mod) => mod.ProfileComponent),
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'informations' },
    {
      path: 'informations',
      loadComponent: () =>
        import('./informations/informations.component').then(
          (mod) => mod.InformationsComponent,
        ),
    },
    {
      path: 'mes-annonces',

      loadComponent: () =>
        import('./mes-annonces/mes-annonces.component').then(
          (mod) => mod.MesAnnoncesComponent,
        ),
    },
    {
      path: 'security',
      loadComponent: () =>
        import('./security/security.component').then(
          (mod) => mod.SecurityComponent,
        ),
    },
  ],
};
