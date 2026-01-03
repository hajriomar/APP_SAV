import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing-module';
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
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
