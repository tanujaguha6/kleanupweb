import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormArray } from '@angular/forms';
export interface DialogData {
  
  user_id: string;
  user_role:  string;
  existing_product : any;
  
}

@Component({
  selector: 'app-product-dialogue',
  templateUrl: './product-dialogue.component.html',
  styleUrls: ['./product-dialogue.component.css']
})
export class ProductDialogueComponent implements OnInit {
  inventoryDetails =[];
  productArray:any;
  existing_product = [];
  constructor(public dialogRef: MatDialogRef<ProductDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private productService: ProductService,
    private formBuilder: FormBuilder) { 
      this.data.existing_product.map(each=>{
        this.existing_product.push(each._id)
      })
    }

  ngOnInit() {
    this.productArray = this.formBuilder.group({
      product_inventory :this.formBuilder.array([])
    });
    
    if(this.data.user_role=="company"){
       this.productService.get_product().subscribe(productData=>{
        let products = productData['product'];
        this.inventoryDetails = products.filter(each=> { return this.existing_product.indexOf(each._id)===-1} )
        this.createProductArray()
     })
   }
   else{
      this.userService.get_inventory(this.data.user_id).subscribe(inventory=>{
        let products = inventory['product'];
        this.inventoryDetails = products.filter(each=> { return this.existing_product.indexOf(each._id)===-1} )
        this.createProductArray()
      })
    }
  }
  createProductArray(){
    let productSet = this.productArray.controls.product_inventory as FormArray;
      this.inventoryDetails.map(each=>{
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
        if(this.existing_product.indexOf(obj._id)===-1)
        productSet.push(this.formBuilder.group(obj));
       

  });
}
add_product(): void {
  let productSet = this.productArray.controls.product_inventory as FormArray;
  
  let add_product_array =productSet.value.filter(each=>{
    return each.quantity>0;
  });
  this.dialogRef.close({ event: 'close', data: add_product_array });
}
}
