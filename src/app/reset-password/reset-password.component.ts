import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  rpDetails = this.fb.group({
    user_password : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirm_password:['',[Validators.required]]
  },{validator: this.checkPasswords });
  
  constructor(private fb : FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private loginService : LoginService,
              private errorHandler : ErrorHandlerService) {
    this.activatedRoute.paramMap
    .subscribe(params => {
        if(params.get('token')) {
            this.token= params.get('token');
            //Do things with new parameter - e.g. reload data
        }
    });
   }

  ngOnInit() {
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('user_password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }
  reset_password(){
    if(this.rpDetails.invalid) return false;
    this.loginService.reset_password(this.rpDetails.value,this.token).subscribe(res=>
      {
        this.errorHandler.show_message(res,'Password has been updated succesfully','/login/');
      })
  }

}
