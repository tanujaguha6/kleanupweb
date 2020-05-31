import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm ,FormArray} from '@angular/forms';  
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categorylist = [];
  image : any;
  imgerror = '';
  submit = false;
  regiForm: FormGroup; 
  productlist = []; 
  product = {};
  input :any;
  imgURL =[];
  type = 'Add';
  @Input() productDetails : any;
  constructor(private fb: FormBuilder,
              private productCategoryService : ProductCategoryService,
              private productService : ProductService, 
              private errorHandler: ErrorHandlerService,
              private router:Router) { 
    this.input = new FormData();
    this.regiForm = fb.group({  
      'name' : [null, Validators.required],  
      'price' : [null, Validators.required], 
      'description' : ['',Validators.required], 
      'category' : [null, Validators.required],  
      'featured' : ['false'],
      'status':['true'],
      'prodImage' : '',
      'image' : ['',Validators.required]
    });  
  }
  onFilesAdded(data) {
    this.image = (data.target.files);
    const files = [...this.image]
    
      for(let i =0; i < files.length; i++){
        if(files[i]['type'].includes('image')){
          this.imgerror = '';
          this.input.append("image[]", files[i], files[i]['name']);
          var reader = new FileReader();
          reader.onload = (event:any) => {
            this.imgURL.push(event.target.result);
          }
          reader.readAsDataURL(data.target.files[i]);
        }
        else{
          this.imgerror = "File must be image";
          this.regiForm.get('image').setValue('');
        }
      }
    
    
  }
  add_product(){
    this.imgerror = '';
    this.submit = true;
    if(this.regiForm.invalid) return false;
    this.input.append('name', this.regiForm.get('name').value);
    this.input.append('price', this.regiForm.get('price').value);
    this.input.append('category', this.regiForm.get('category').value);
    this.input.append('featured', this.regiForm.get('featured').value);
    this.input.append('status', this.regiForm.get('status').value);
    this.input.append('description', this.regiForm.get('description').value);
    if(this.productDetails){
      this.productService.update_product(this.input,this.productDetails._id.toString()).subscribe(data=>
        {
        this.errorHandler.show_message(data,'Product has been updated successfully!!','/product/');

        })
    }else{
    this.productService.add_product(this.input).subscribe(data=>
      {
        this.errorHandler.show_message(data,'Product has been added successfully!!','/product');
      })
  }
}
 
  ngOnInit() {
    this.productCategoryService.get_category().subscribe((category)=>{
      this.categorylist = category['response'];
    })
   
    if(this.productDetails){
      this.type = "Edit"; 
        this.regiForm.patchValue(this.productDetails);
        this.regiForm.patchValue({"featured" : this.productDetails.featured.toString()});
        this.regiForm.patchValue({"status" : this.productDetails.status.toString()});
        
    }
  }
  back(){
    this.router.navigate(['/product/']);
  }
}
