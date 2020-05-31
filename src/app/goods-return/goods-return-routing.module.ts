import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsReturnComponent } from './goods-return.component';
import { CreateGoodComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: GoodsReturnComponent },
  { path: 'create', component: CreateGoodComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsReturnRoutingModule { }
