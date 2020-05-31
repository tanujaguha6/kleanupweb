import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category_id : string;
  category :any;
  constructor(private activatedRoute : ActivatedRoute, private productCategoryService : ProductCategoryService) { 
    this.activatedRoute.paramMap
    .subscribe(params => {
        if(params.get('id') !== this.category_id) {
            this.category_id= params.get('id');
            //Do things with new parameter - e.g. reload data
        }
    });
  }

  ngOnInit() {
    this.productCategoryService.get_category_details(this.category_id).subscribe((data)=>{
      
      this.category = data['response'][0];
     
    });
  }

}
