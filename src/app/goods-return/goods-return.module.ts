import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsReturnRoutingModule } from './goods-return-routing.module';
import { GoodsReturnComponent } from './goods-return.component';
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
import { LayoutModule } from '@angular/cdk/layout';
import { CreateGoodComponent } from '../goods-return/create/create.component';



@NgModule({
  declarations: [
    GoodsReturnComponent,
    CreateGoodComponent
  ],
  imports: [
    CommonModule,
    GoodsReturnRoutingModule,
    LayoutModule,
    MatPaginatorModule ,
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
  ]
})
export class GoodsReturnModule { }
