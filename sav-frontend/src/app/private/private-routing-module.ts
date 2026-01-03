import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { authGuard } from '../core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients-module').then(m => m.ClientsModule)
      },
      {
        path: 'vehicules',
        loadChildren: () => import('./vehicules/vehicules-module').then(m => m.VehiculesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
