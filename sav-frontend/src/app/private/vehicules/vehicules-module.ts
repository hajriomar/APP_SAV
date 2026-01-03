import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VehiculesRoutingModule } from './vehicules-routing-module';
import { List } from './list/list';
import { Create } from './create/create';
import { Edit } from './edit/edit';  

@NgModule({
  declarations: [
    List,
    Create,
    Edit         
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VehiculesRoutingModule
  ]
})
export class VehiculesModule { }
