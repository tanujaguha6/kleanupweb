import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateGoodComponent implements OnInit {
  return_good : any;
  channelPartner =[];
  user_role = localStorage.getItem('user_role');
  user_id = localStorage.getItem('user_id');
  submit = false;
  constructor( private fb: FormBuilder, 
               private userService: UserService,
               private productService: ProductService,
               private orderService: OrderService,
               private errorHandler: ErrorHandlerService,
               private router: Router) { }

  ngOnInit() {
    this.return_good = this.fb.group({  
      'to_id':['',[Validators.required]],
      'return_date':['',[Validators.required]],
      'product_details': this.fb.array([], [Validators.required])
    });
    this.userService.get_parent_list().subscribe(userList=>{
      this.channelPartner =userList["response"][0].user_details
    }) 
    if(this.user_role=="company"){
      this.productService.get_product().subscribe(productData=>{
       let products = productData['product'];
       this.createProductArray(products)
    })
  }
  else{
     this.userService.get_inventory(this.user_id).subscribe(inventory=>{
       let products = inventory['product'];
       this.createProductArray(products)
     })
   }
  }
  createProductArray(products){
    let productSet = this.return_good.controls.product_details as FormArray;
    products.map(each=>{
        var obj = {
          _id : each._id,
          name : each.name,
          quantity : 0,
          price : each.price,
          category : each.category,
          banner : each.banner,
          feature : each.featured,
          image : [each.image]
        }
    productSet.push(this.fb.group(obj));
  });
  }
  back(){
    this.router.navigate(['goods-return'])
  }
  get getData(){
    return this.return_good.controls.product_details['controls'];
  }
  return_submit(){
    this.submit = true;
    if(this.return_good.invalid){
      return false;
    } 
    this.orderService.send_return(this.return_good.value).subscribe(return_good=>{
      this.errorHandler.show_message(return_good,'Return request has been sent successfully!!','/goods-return/');
    })
  }
  remove(id){
    let productArray = this.return_good.controls.product_details;
    productArray.removeAt(id);
  }

}
