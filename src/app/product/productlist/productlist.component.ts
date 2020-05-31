import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})


export class ProductlistComponent implements OnInit {
  data : any;
  categorylist : any=[];
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  displayedColumns: string[] = [ 'Name','Price','Category','Status','Action'];
  constructor(private productService : ProductService, 
              private router : Router, 
              private errorHandler: ErrorHandlerService,
              private productCategoryService: ProductCategoryService){}
  ngOnInit(){
    this.get_product();
    this.productCategoryService.get_category().subscribe((category)=>{
      this.categorylist = category['response'];
    })
  }
  get_product(){
    this.productService.get_product().subscribe(productData=>{
      this.data = new MatTableDataSource(productData['product']);
      this.data.paginator = this.paginator;
      
   })
   
  }
  applyFilter(event) {
    const filterValue = event.value;
    if(filterValue == "all"){ 
      this.get_product();
    }else{
      this.data.filter = filterValue.trim().toLowerCase();
      this.data.paginator = this.paginator;
    }
  }
  create_product(){
    this.router.navigate(['/product/create/'])
  } 
  details(prod_id){
    this.router.navigate(['/product/details/',prod_id])
  }
  delete(prod_id){
    if(confirm("Are you sure you want to delete the product?")){
      this.productService.delete_product(prod_id).subscribe(productData=>{
        this.errorHandler.show_message(productData,'Product has been deleted successfully!!');
        this.get_product();
      })
    }
  }
}
