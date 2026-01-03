import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivateRoutingModule } from './private-routing-module';
import { Layout } from './layout/layout';
import { Navbar } from './layout/navbar/navbar';
import { Sidebar } from './layout/sidebar/sidebar';
import { Footer } from './layout/footer/footer';
import { DashboardModule } from './dashboard/dashboard-module';
import { VehiculesModule } from './vehicules/vehicules-module';
import { ClientsModule } from './clients/clients-module';

@NgModule({
  declarations: [
    Layout,
    Navbar,
    Sidebar,
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrivateRoutingModule,
    DashboardModule,
    VehiculesModule,
    ClientsModule
  ]
})
export class PrivateModule { }
