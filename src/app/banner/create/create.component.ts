import { Component, OnInit, Input } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {ErrorHandlerService} from 'src/app/services/error-handler.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  image : any;
  imgURL : string;
  input = new FormData();
  category = [];
  products = [];
  submit = false;
  imgError = '';
  banner = this.fb.group({
    banner_type : ['',Validators.required],
    image : ['',Validators.required],
    id :['',Validators.required]
  })
  
  constructor(  private categoryService : ProductCategoryService , 
                private productService : ProductService, 
                private fb : FormBuilder,
                private router :Router, 
                private errorHandler : ErrorHandlerService) {
    
   }
  onFilesAdded(data) {
    this.imgError = '';
    if(!data.target.files[0].type.includes('image')){
      this.imgError = "Only image are accepted."
      return false;
    }
    this.image = (data.target.files[0]);
    this.banner.get('image').setValue(this.image);
    this.input.append('image', this.banner.get('image').value);
    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result as string;
    }
    reader.readAsDataURL(this.image)
  }
  private prepareSave(): any {
    
    this.input.append('banner_type', this.banner.get('banner_type').value);
    const id_field = this.banner.get('id').value;
    let data = id_field.split(',');
    this.input.append('id', data[0]);
    this.input.append('name', data[1]);
    return this.input;
  }
  
  add_banner(){
    this.submit =true;
    this.imgError = '';
    if(!this.banner.valid) return false;
    this.categoryService.add_banner(this.prepareSave()).subscribe(categoryAdd=>
      {
        this.errorHandler.show_message(categoryAdd,'Banner has been added successfully!!','/banner/');
      })
  }

  back(){
    this.router.navigate(['/banner'])
  }
  
  ngOnInit() {
    this.categoryService.get_category_having_product().subscribe(categories => {
      this.category = categories['response'];
    })
    this.banner.get('banner_type').valueChanges.subscribe(val=>{
      this.banner.get('id').setValue('');
    })
    this.productService.get_product().subscribe(productData=>{
      this.products = productData['product'];
   })
  }
}
