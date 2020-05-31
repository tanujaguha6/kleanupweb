import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private fb: FormBuilder , private loginService : LoginService, private router : Router, private toastr: ToastrService) { }
  loginDetails = this.fb.group({
    username : ['',[Validators.required]],
    password : ['',[Validators.required]]
  });
  ngOnInit() {
    
  }
  login(){
    if(!this.loginDetails.valid)return false;
    this.loginService.loginFun(this.loginDetails.value).subscribe(
      resp=>{
        if(resp.status == 1){
           location.href = '/';
        }else{
           this.toastr.error(resp.message);
        }
      })
  }

}
