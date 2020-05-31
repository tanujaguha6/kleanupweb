import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { CreateNoOrderComponent } from './create-no-order/create-no-order.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'create/:id', component: InvoiceCreateComponent },
  { path: 'details/:id', component: InvoiceDetailsComponent },
  { path: 'create-no-order', component: CreateNoOrderComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
 