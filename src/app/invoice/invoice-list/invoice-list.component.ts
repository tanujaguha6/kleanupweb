import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  data : any;
  filterData : any;
  order_id:String;
  type="all";
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['Invoice number', 'Invoice date','Sent From','Sent To','Order number','Action'];
  constructor(private orderService : OrderService, private route:Router, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.queryParams.subscribe(
      params => this.order_id = params['order_id']);
   }

  
  ngOnInit() {
    this.invoiceList()
    
    
  }
  invoiceList(){
    if(this.type=="all"){
      if(localStorage.getItem('user_role') == "company"){
      this.orderService.get_all_invoice().subscribe(productData=>{
        this.data = new MatTableDataSource(productData['response']);
        this.data.paginator = this.paginator;
        if(this.order_id){
          this.filterData = this.order_id;
          this.applyFilter();
        }
      })
    }
    else{
      let user_id = localStorage.getItem('user_id');
      this.orderService.get_loggedin_invoice(user_id).subscribe(productData=>{
        this.data = new MatTableDataSource(productData['response']);
        this.data.paginator = this.paginator;
        if(this.order_id){
          this.filterData = this.order_id;
          this.applyFilter();
        }
      })
    }
    }
    else{
      this.orderService.get_invoice().subscribe(productData=>{
        this.data = new MatTableDataSource(productData['response']);
        this.data.paginator = this.paginator;
        if(this.order_id){
          this.filterData = this.order_id;
          this.applyFilter();
        }
      })
    }
  }
  getInvoice(type){
    this.type=type;
    this.invoiceList();
  }
  invoice_details(id){
    this.route.navigate(['invoice/details/',id])
  }
  create_invoice(){
    this.route.navigate(['invoice/create-no-order/'])
  }
  applyFilter() {
    
    if(this.filterData == "all"){ 
      this.invoiceList();
    }else{
      this.data.filter = this.filterData.trim().toLowerCase();
      this.data.paginator = this.paginator;
    }
  }
}
