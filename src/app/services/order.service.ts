import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {config} from '../../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
  get_my_order(){
    return this.http.get(config.apiEndpoint + 'order-recieve');
  }
  get_order(){
    return this.http.get(config.apiEndpoint + 'all-order');
  }
  get_invoice(){
    return this.http.get(config.apiEndpoint + 'invoice-sent');
  }
  get_all_invoice(){
    return this.http.get(config.apiEndpoint + 'invoice-all');
  }
  get_loggedin_invoice(user_id){
    return this.http.get(config.apiEndpoint + 'invoice-list-data/'+user_id);
  }
  get_order_details(order_id){
    return this.http.get(config.apiEndpoint + 'order-detail/'+order_id);
  }
  create_invoice(invoice){
    return this.http.post(config.apiEndpoint + 'create-invoice',invoice);
  }
  get_invoice_details(invoice_id){
    return this.http.get(config.apiEndpoint + 'invoice-details/'+invoice_id);
  }
  read_order(order_id){
    return this.http.get(config.apiEndpoint + 'order-detail/'+order_id);
  }
  updateStatus(data,order_id){
    return this.http.patch(config.apiEndpoint + 'update-order/'+order_id,data);
  }
  order_list_cp(user_id){
    return this.http.get(config.apiEndpoint + 'order-list-cp/'+user_id);
  }
  get_order_by_id(user_id){
    return this.http.get(config.apiEndpoint + 'order-list/'+user_id);
  }
  send_return(return_data){
    return this.http.post(config.apiEndpoint + 'add-good',return_data);
  }
  goods_return(){
    return this.http.get(config.apiEndpoint + 'return-good/');
  }
  accept_return(id){
    return this.http.post(config.apiEndpoint + 'accept-return-good',{id : id});
  }
}
