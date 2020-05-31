import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,MatTableModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';


@NgModule({
  declarations: [
    CategorylistComponent,
    ProductCategoryComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatPaginatorModule ,
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
export class CategoryModule { }
