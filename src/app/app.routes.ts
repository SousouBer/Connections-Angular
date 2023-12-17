import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { SigninComponent } from './auth/components/signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./core/components/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
  },
  {
    path: 'group/:groupId',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./core/components/group-dialog/group-dialog.component').then(
        (mod) => mod.GroupDialogComponent
      ),
  },
];
