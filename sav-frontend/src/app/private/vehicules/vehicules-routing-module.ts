import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './list/list';
import { Create } from './create/create';
import { Edit } from './edit/edit'; 

const routes: Routes = [
  {
    path: '',
    component: List
  },
  {
    path: 'create',
    component: Create
  },
  {
    path: 'edit/:id',   
    component: Edit     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculesRoutingModule { }
