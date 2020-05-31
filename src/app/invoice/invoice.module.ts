import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatDialog, MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,MatTableModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { CreateNoOrderComponent } from './create-no-order/create-no-order.component';
import { ProductDialogueComponent } from '../product-dialogue/product-dialogue.component';
@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceCreateComponent,
    InvoiceDetailsComponent,
    CreateNoOrderComponent,
    ProductDialogueComponent

  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MatPaginatorModule ,
    LayoutModule,
    MatDialogModule ,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule

  ],
  entryComponents: [
    ProductDialogueComponent
 ]
})
export class InvoiceModule { }
