import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder,FormArray, Validators } from '@angular/forms';  
import { ActivatedRoute, Router } from '@angular/router';
import {config} from '../../config';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { MatDialog }  from '@angular/material/dialog';
import { ProductDialogueComponent } from 'src/app/product-dialogue/product-dialogue.component';


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {
  invoice :any;
  order_id : any;
  order_details : any;
  products : any;
  obj : Object;
  name: string;
  url  = config.apiEndpoint;
  constructor(private orderService : OrderService,
              private fb: FormBuilder, 
              private errorHandler: ErrorHandlerService, 
              private activeRoute: ActivatedRoute, 
              private router:Router,
              public dialog: MatDialog) { 
     this.activeRoute.paramMap
        .subscribe(params => {
            if(params.get('id') !== this.order_id) {
                this.order_id= params.get('id');
            }
        });
  }

  ngOnInit() {
    this.invoice = this.fb.group({  
      'order_number' : [null, Validators.required],  
      'waybill':[null, Validators.required],  
      'order_id' :[this.order_id],
      'to_id':[''],
      'shipping_address':['',Validators.required],
      'product_details': this.fb.array([], [Validators.required])
    }); 
    this.orderService.get_order_details(this.order_id).subscribe((data)=>{
      
      this.order_details = data['response'][0];
      
      this.invoice.get('order_number').setValue(this.order_details.order_number);
      this.invoice.get('to_id').setValue(this.order_details.from_id);
      this.products = data['response'][0].product_details;
     
      let productArray = this.invoice.controls.product_details as FormArray;
      this.products.map(each=>{
        
        var obj = {
          _id : each._id,
          name : each.name,
          quantity : each.quantity,
          price : each.price,
          category : each.category,
          banner : each.banner,
          feature : each.featured,
          image : [each.image]
        }
        productArray.push(this.fb.group(obj));
      })
    }) 
  }
  get getData(){
    return this.invoice.controls.product_details['controls'];
  }
  remove(id){
    let productArray = this.invoice.controls.product_details;
    productArray.removeAt(id);
  }
  more_product(): void {
    const dialogRef = this.dialog.open(ProductDialogueComponent, {
      width: '250px',
      data: {user_id: localStorage.getItem('user_id'),user_role: localStorage.getItem('user_role'),existing_product:this.invoice.controls.product_details.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      let productArray = this.invoice.controls.product_details as FormArray;
      result.data.map(each=>{
        var obj = {
          _id : each._id,
          name : each.name,
          quantity : each.quantity,
          price : each.price,
          category : each.category,
          banner : each.banner,
          feature : each.featured,
          image : [each.image]
        }
        productArray.push(this.fb.group(obj));
      })
    });
  }
  back(){
    this.router.navigate(['order']);
  }
  add_invoice(){
    if(this.invoice.invalid) return false;
    this.orderService.create_invoice(this.invoice.value).subscribe((data)=>{
      this.errorHandler.show_message(data,"Invoice created successfully!!",'/order/');
    });
  }
}
