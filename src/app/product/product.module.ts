import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductRoutingModule } from './product-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule, MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule,MatGridListModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,MatTableModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
@NgModule({
  declarations: [
    CreateProductComponent,
    ProductlistComponent,
    ProductDetailsComponent,

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    LayoutModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatGridListModule,
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
export class ProductModule { }
