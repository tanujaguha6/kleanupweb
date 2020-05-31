import { Component, OnInit, Input } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import {FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  submit = false;
  image : any;
  imgURL : string;
  imgError = '';
  type = "Create";
  input = new FormData();
  @Input() categorydetails;
  category = this.fb.group({
    name : ['',Validators.required],
    image : ['',Validators.required],
    sort_order :['',Validators.required],
    featured : ['false',Validators.required],
    status : ['true',Validators.required]
  })
  
  constructor(  private categoryService : ProductCategoryService , 
                private fb : FormBuilder, 
                private router :Router, 
                private errorHandler: ErrorHandlerService) {
    
   }
  onFilesAdded(data) {
    if(!data.target.files[0].type.includes('image')){
      this.imgError = "Only image are accepted."
      return false;
    }
    this.image = (data.target.files[0]);
    this.category.get('image').setValue(this.image);
    this.input.append('image', this.category.get('image').value);
    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result as string;
    }
    reader.readAsDataURL(this.image)
  }
  private prepareSave(): any {
    this.input.append('name', this.category.get('name').value);
    this.input.append('featured', this.category.get('featured').value);
    this.input.append('status', this.category.get('status').value);
    this.input.append('sort_order', this.category.get('sort_order').value);
    return this.input;
  }

  add_category(){
    this.submit =true;
    this.imgError ='';
    if(this.category.invalid) return false;
    if(this.categorydetails){
      this.categoryService.update_category(this.prepareSave(),this.categorydetails._id.toString()).subscribe(data=>
        {
        this.errorHandler.show_message(data,'Category has been edited successfully!!','/category/');
        })
    }else{
    this.categoryService.add_category(this.prepareSave()).subscribe(data=>
      {
        this.errorHandler.show_message(data,'Category has been added successfully!!','/category/');
      })
    }
  }
  back(){
    this.router.navigate(['/category'])
  }
  ngOnInit() {
    if(this.categorydetails){
      this.type = "Edit";
      this.category.patchValue(this.categorydetails);
      this.category.patchValue({"featured" : this.categorydetails.featured.toString()});
      this.category.patchValue({"status" : this.categorydetails.status.toString()});

    }  
  }

}
