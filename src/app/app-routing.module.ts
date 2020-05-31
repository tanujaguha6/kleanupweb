import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const appRoutes: Routes = [
  { path : '', redirectTo : '/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent,canActivate: [AuthguardService]
  },
  { path: 'forget-password', component: ForgetPasswordComponent
  },
  { path: 'reset-password/:token', component: ResetPasswordComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
     canActivate: [AuthguardService]
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'goods-return',
    loadChildren: () => import('./goods-return/goods-return.module').then(m => m.GoodsReturnModule),
    canActivate: [AuthguardService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
