import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  data : any;
  user_role = localStorage.getItem("user_role");
  selectedIndex :any;
  selected_channel_partner:any="";
  status:any="all";
  order_status:string;
  waybill:string;
  type: String = "all";
  channelpartnerList =[];
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['Order number','Order date','Name', 'Sent To','Status','Action'];
  constructor(private orderService : OrderService , 
              private userService : UserService,
              private route : Router, 
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.generateOrderData();
    if(this.user_role!="company")
    this.populateChannelpartner();
  }
  populateChannelpartner(){
    this.userService.get_channel_partner_list().subscribe(cp=>{
      this.channelpartnerList = cp["response"];
    })
  }
  create_invoice(id){
    this.route.navigate(['/invoice/create', id]);
  }
  get_details(id){
    this.route.navigate(['/order/details', id]);
  }
  generateOrderData(){
    if(localStorage.getItem('user_role') == "company"){
      this.orderService.get_order().subscribe(orderData=>{
        this.data = new MatTableDataSource(orderData['response']);
        this.data.paginator = this.paginator;
      })
    }else{
     // if(this.channel_partner){ this.refreshOrder()}else{
      this.orderService.get_order_by_id(localStorage.getItem('user_id')).subscribe(orderData=>{
          this.data = new MatTableDataSource(orderData['response']);
          this.data.paginator = this.paginator;
      })
    //  }
    }
  }
  refreshOrder(){
    var user_id =this.selected_channel_partner;
    this.orderService.order_list_cp(user_id).subscribe(orderData=>{
      this.data = new MatTableDataSource(orderData['response']);
      this.data.paginator = this.paginator;
   })
    
  }
  getMyOrder(){
    this.orderService.get_my_order().subscribe(orderData=>{
      this.data = new MatTableDataSource(orderData['response']);
      this.data.paginator = this.paginator;
   })
  }
  show_status(id){
    this.selectedIndex = id;
  }
  hide_status(){
    this.selectedIndex = ''
  }
  save(event,id){
    if(event.value!='Dispatched'){
      this.orderService.updateStatus({status:event.value},id).subscribe(orderData=>{
        this.errorHandler.show_message(orderData,"Order updated to "+event.value+" status");
        this.getOrder(this.type);
        this.selectedIndex='';
    })
    }
  }
  save_dispatch(id){
      this.orderService.updateStatus({status:this.order_status,waybill:this.waybill},id).subscribe(orderData=>{
        this.errorHandler.show_message(orderData,"Order updated to "+this.order_status+" status");
        this.getOrder(this.type);
        this.selectedIndex='';
    })
    
  }
  invoice_list(id){
    this.route.navigate(['invoice'],{ queryParams: { order_id: id}})
  }
  getOrder(type){
    this.type = type;
    this.status = "all";
    if(this.type == "my"){
      this.getMyOrder();
    }
    else{
      this.generateOrderData();
    }
  }
applyFilter(event) {
    const filterValue = event.value;
    if(filterValue == "all"){ 
      this.getOrder(this.type);
    }else{
      this.data.filter = filterValue.trim().toLowerCase();
      this.data.paginator = this.paginator;
    }
  }
  
}
