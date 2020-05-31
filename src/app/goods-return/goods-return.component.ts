import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { ErrorHandlerService } from '../services/error-handler.service';
@Component({
  selector: 'app-goods-return',
  templateUrl: './goods-return.component.html',
  styleUrls: ['./goods-return.component.css']
})
export class GoodsReturnComponent implements OnInit {
  displayedColumns = ['Return date','Name','Sent To','Status'];
  data : any;
  user_role = localStorage.getItem('user_role')
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  constructor(private router: Router,private orderService :OrderService,private errorHandler:ErrorHandlerService) { }

  ngOnInit() {
    this.get_data();
  }
  get_data(){
    this.orderService.goods_return().subscribe(orderData=>{
      this.data = new MatTableDataSource(orderData['response']);
      this.data.paginator = this.paginator;
    })
  }
  add_return(){
    this.router.navigate(['/goods-return/create']);
  }
  accept(id){
    this.orderService.accept_return(id).subscribe(accept_return=>{
      this.errorHandler.show_message(accept_return,"Goods return has been accepted successfully!!",'/goods-return');
      this.get_data();
    })
  }
}
