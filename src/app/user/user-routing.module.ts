import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'create', component: CreateComponent },
  { path: 'detail/:id', component: DetailsComponent },
  { path: 'inventory/:id', component: InventoryComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
