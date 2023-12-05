import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'main', loadComponent: () => import('./core/main/main.component').then(mod => mod.MainComponent)
  },
  {
    path: 'signin', loadComponent: () => import('./auth/components/signin/signin.component').then(mod => mod.SigninComponent)
  },
  {
    path: 'signup', loadComponent: () => import('./auth/components/signup/signup.component').then(mod => mod.SignupComponent)
  }
];