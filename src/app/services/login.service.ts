import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import {config} from '../../app/config.js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginDataServ:any = {};
  constructor(private http:HttpClient ) { }
  
  loginFun(loginData):any{
    this.loginDataServ = {
      user_id : loginData.username,
      password : loginData.password
    };
    
    return this.http.post(config.apiEndpoint + 'login',this.loginDataServ)
            .pipe(tap(res => 
              {
                if(res['status']=="1")
                  this.setSession(res)
              })
            );
  }
  forgot_password(data){
    return this.http.post(config.apiEndpoint + 'forgot-password',data);
  }
  reset_password(data,token){
    return this.http.post(config.apiEndpoint + 'reset-password/'+token,data);
  }
  private setSession(authResult) {
    
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('user_role', authResult.user.user_role);
    localStorage.setItem('user_id', authResult.user._id);

  } 
  isLoggedIn(){
    console.log(localStorage.getItem('id_token'))
    if(localStorage.getItem('id_token')){
      return true;
    }
    return false;
  }
  logout(){
    localStorage.setItem('id_token', '');
    this.isLoggedIn();
    return true;
  }
}
