import { Routes } from '@angular/router';
import { APP_PATHS } from 'src/app/app.paths';

export const PROFILE_ROUTING: Routes = [
  { path: '', redirectTo: APP_PATHS.HISTORY, pathMatch: 'full' },
  {
    path: APP_PATHS.HISTORY,
    loadComponent: () =>
      import('./profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: APP_PATHS.BILLING,
    loadComponent: () =>
      import('./profile.component').then((m) => m.ProfileComponent),
  },
];
