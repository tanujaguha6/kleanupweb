import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {config} from '../../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productArray = [];
  private product = new BehaviorSubject<any[]>([]);
  productList = this.product.asObservable();
  constructor(private http:HttpClient) { }
  add_product(data){
    this.productArray = data;
    return this.http.post(config.apiEndpoint + 'add-product',this.productArray);
  }
  update_product(data,prod_id){
   
    this.productArray = data;
    return this.http.patch(config.apiEndpoint + 'update-product/'+prod_id,this.productArray);
  }
  get_product(){
    return this.http.get(config.apiEndpoint + 'product-list');
  }
  read_product(id){
    return this.http.get(config.apiEndpoint + 'read-product/'+id);
  }
  delete_product(id){
    return this.http.delete(config.apiEndpoint + 'delete-product/'+id);
  }
}
