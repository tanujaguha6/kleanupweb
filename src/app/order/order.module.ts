import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule, MatTooltipModule, MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,MatTableModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent

  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    LayoutModule,
    MatTooltipModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
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

  ]
})
export class OrderModule { }
