import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { APP_PATHS } from './app.paths';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: APP_PATHS.GENERATION,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/generation/generation.component').then(
        (m) => m.GenerationComponent,
      ),
  },
  {
    path: `${APP_PATHS.RESET_PASSWORD}`,
    loadComponent: () =>
      import(
        './shared/components/reset-password/reset-password.component'
      ).then((m) => m.ResetPasswordComponent),
  },
  {
    path: APP_PATHS.PROFILE,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
  {
    path: APP_PATHS.PRIVACY_POLICY,
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent,
      ),
  },
  {
    path: APP_PATHS.TERMS_OF_SERVICE,
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service.component').then(
        (m) => m.TermsOfServiceComponent,
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
