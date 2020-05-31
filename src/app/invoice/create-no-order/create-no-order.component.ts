import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import {UserService} from 'src/app/services/user.service';
import { FormBuilder,FormArray, Validators } from '@angular/forms';  
import {  Router } from '@angular/router';
import {config} from '../../config';
import { ProductService } from 'src/app/services/product.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-create-no-order',
  templateUrl: './create-no-order.component.html',
  styleUrls: ['./create-no-order.component.css']
})
export class CreateNoOrderComponent implements OnInit {
  invoice :any;
  order_details : any;
  channelPartner : any;
  products : any;
  obj : Object;
  url  = config.apiEndpoint;
  constructor(private orderService : OrderService, 
              private userService:UserService, 
              private productService:ProductService,
              private fb: FormBuilder, 
              private errorHandler: ErrorHandlerService, 
              private router:Router) { 
     
  }

  ngOnInit() {
    this.invoice = this.fb.group({  
      'to_id':['',Validators.required],
      'shipping_address':['',Validators.required],
      'waybill':['',Validators.required],
      'status':'Invoiced',
      'invoice_date':['',Validators.required],
      'product_details': this.fb.array([], [Validators.required])
    }); 
    this.get_products();
    this.get_cp_list();
  }
  get_products(){
    let user_id = localStorage.getItem("user_id");
    if(localStorage.getItem("user_role")=="company"){
      this.productService.get_product().subscribe((productData)=>{
        this.get_Product_list(productData);
      })
    }else{
      this.userService.get_inventory(user_id).subscribe((productData)=>{
        this.get_Product_list(productData);
      })
    }
  }
  get_Product_list(productData){
      this.products = productData['product'];
      let productArray = this.invoice.controls.product_details as FormArray;
      this.products.map(each=>{
        var obj = {
          _id : each._id,
          name : each.name,
          quantity : 1,
          price : each.price,
          category : each.category,
          banner : each.banner,
          feature : each.featured,
          image : [each.image],
          category_details : [each.category_details]
        }
        productArray.push(this.fb.group(obj));
      })
  }
  get_cp_list(){
    this.userService.get_channel_partner_list().subscribe(userList=>{
      console.log(userList)
      this.channelPartner =userList['response'];
      
    })
  }
  get getData(){
    return this.invoice.controls.product_details['controls'];
  }
  remove(id){
    let productArray = this.invoice.controls.product_details;
    productArray.removeAt(id);
  }
  back(){
    this.router.navigate(['invoice']);
  }
  add_invoice(){
    if(!this.invoice.valid) return false;
    const invoice_date = this.invoice.get('invoice_date').value.getTime()
    let data = {...this.invoice};
    data.value.invoice_date = invoice_date;
    this.orderService.create_invoice(this.invoice.value).subscribe((data)=>{
      this.errorHandler.show_message(data,"Invoice created successfully!!",'/invoice/');
      
    });

  }

}
