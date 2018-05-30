/**
 * Routing
 */
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
export const routes: Routes = [
  {path:'details/:beerId',component:DetailComponent},
  {path: '**', redirectTo: '/'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
