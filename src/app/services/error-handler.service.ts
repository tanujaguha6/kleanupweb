import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toaster: ToastrService, private router:Router) { }

  show_message(data,msg,redirect_url=null){
    if(data.status=="1"){
      this.toaster.success(msg); 
      if(redirect_url)this.router.navigate([redirect_url]); 
    }
    else{
      this.toaster.error(data.message); 
    }
  }
}
