import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product_id : String;
  product : any;
  constructor(private productService : ProductService, private activeRoute: ActivatedRoute, private route : Router) { 
    this.activeRoute.paramMap
        .subscribe(params => {
            if(params.get('id') !== this.product_id) {
                this.product_id= params.get('id');
            }
        });
  }

  ngOnInit() {
    this.productService.read_product(this.product_id).subscribe((product)=>{
      this.product = product['response'][0];
    })
  }
}
