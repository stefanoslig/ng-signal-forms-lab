import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'guides',
    loadChildren: () => import('./guides/guide.routes'),
  },
  {
    path: '',
    loadComponent: () => import('./landing/landing').then((m) => m.Landing),
    pathMatch: 'full',
    data: { hideSidebar: true },
  },
  {
    path: '**',
    redirectTo: 'guides/core-concepts',
    pathMatch: 'full',
  },
];
