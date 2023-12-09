import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/main/main.component').then(
        (mod) => mod.MainComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/components/signin/signin.component').then(
        (mod) => mod.SigninComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/components/signup/signup.component').then(
        (mod) => mod.SignupComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./core/components/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
  },
];
