import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const routes: Routes = [
  {path:'',component:CategorylistComponent},
  {path:'create',component:ProductCategoryComponent},
  {path:'details/:id',component:CategoryDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
