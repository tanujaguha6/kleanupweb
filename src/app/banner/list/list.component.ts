import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  bannerList : any = [];
  displayedColumns = ['Image','Banner Type','Name','Delete']
  constructor(private categoryService: ProductCategoryService,
              private router:Router, 
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.get_banner();
    }
    get_banner(){
      this.categoryService.get_all_banner().subscribe(banner=>
        {
          this.bannerList = banner['response'];
        })
    }
    create_banner(){
      this.router.navigate(['banner/create']);
    }
    delete(id){
      if(confirm("Are you sure you want to delete?")){
        this.categoryService.delete_banner(id).subscribe(data=>{
          this.errorHandler.show_message(data,'Banner has been deleted successfully!!');
          this.get_banner();
        })
      }
    }
  }


