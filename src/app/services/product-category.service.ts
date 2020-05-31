import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {config} from '../../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  categorySet = [];
  bannerSet = [];
  private category = new BehaviorSubject<any[]>([]);
  currentCategory = this.category.asObservable();
  constructor(private http:HttpClient) { }
  add_category(data){
    this.categorySet = data;
    return this.http.post(config.apiEndpoint + 'add-category',this.categorySet);
  }
  get_category(){
    return this.http.get(config.apiEndpoint + 'all-category');
  }
  get_category_having_product(){
    return this.http.get(config.apiEndpoint + 'category');
  }
  get_category_details(id){
    return this.http.get(config.apiEndpoint + 'read-category/'+id);
  }
  update_category(data,cat_id){
    this.categorySet = data;
    return this.http.patch(config.apiEndpoint + 'update-category/'+cat_id,this.categorySet);
  }
  add_banner(data){
    this.bannerSet = data;
    return this.http.post(config.apiEndpoint + 'add-banner',this.bannerSet);
  }
  get_all_banner(){
    return this.http.get(config.apiEndpoint + 'all-banner');
  }
  delete_banner(id){
    return this.http.delete(config.apiEndpoint + 'delete-banner/'+id);

  }
}
