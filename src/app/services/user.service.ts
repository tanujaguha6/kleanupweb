import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import {config} from '../../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData:any = {};
  constructor(private http:HttpClient) { }
  add_user(data){
    this.userData = data;
    return this.http.post(config.apiEndpoint + 'add-user',this.userData);
  }
  update_user(data,id){
    this.userData = data;
    return this.http.patch(config.apiEndpoint + 'update-user/'+id,this.userData);
  }
 
  superstockist(){
    return this.http.get(config.apiEndpoint + 'users-stockist');
  }
  user_list(){
    return this.http.get(config.apiEndpoint + 'users');
  }
  get_user(id){
    return this.http.get(config.apiEndpoint + 'read-user/'+id);
  }
  get_channel_partner(id){
    return this.http.get(config.apiEndpoint + 'read-details/'+id);
  }
  get_channel_partner_list(){
    return this.http.get(config.apiEndpoint + 'get-channel-partners');
  }
  get_channel_partner_own(){
    return this.http.get(config.apiEndpoint + 'get-channel-partner-own');
  }
 
  get_inventory(id){
    return this.http.get(config.apiEndpoint + 'read-inventory/'+id);
  }
  get_parent_list(){
    return this.http.get(config.apiEndpoint + 'get-parent');
  }
 
  
}
