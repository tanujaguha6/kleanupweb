import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  fpDetails = this.fb.group({
    user_login_id : ['',[Validators.required]]
  });
  constructor( private fb: FormBuilder, private loginService: LoginService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    
  }
  forget_password(){
    if(this.fpDetails.invalid) return false;
    this.loginService.forgot_password(this.fpDetails.value).subscribe(res=>
      {
        this.errorHandler.show_message(res,'Password request has been sent successfully','/login/');
      })
  }
}
