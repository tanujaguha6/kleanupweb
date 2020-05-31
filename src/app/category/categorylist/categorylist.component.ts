import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import {Router} from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  categories : any;
  teachDS: any;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['No', 'Category','Featured','Sort Order','Status','Action'];
 
  constructor(private categoryService : ProductCategoryService, private router:Router ) { }

  ngOnInit() {
    this.getCategory()
  }
  details(id){
    this.router.navigate(['/category/details',id])
  }
 getCategory(){
  this.categoryService.get_category().subscribe(categories => {
    this.teachDS = new MatTableDataSource(categories['response']);
    this.teachDS.paginator = this.paginator;
  })
}
create_category(){
  this.router.navigate(['/category/create'])
}

}
