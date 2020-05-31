import { Component, OnInit,Input } from '@angular/core';
import {FormBuilder,  Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  ss_list : any;
  input:any;
  type:String='Create';
  user_role= localStorage.getItem('user_role');
  @Input() userdata;
  @Input() cpData;
  constructor(private fb:FormBuilder, 
              private userService : UserService, 
              private router: Router, 
              private errorHandler: ErrorHandlerService) { }
  
  user = this.fb.group({
     user_details : this.fb.group({
        user_name : ['',Validators.required],
        proprietor :  ['',Validators.required],
        firm_name :  ['',Validators.required],
        user_email : ['',[Validators.required,Validators.email]],
        user_login_id : ['',Validators.required],
        user_password : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
        user_role : ['',[Validators.required]],
        mobile :['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
        status : ['true'],
        parent_id : ['']
     }),
     details : this.fb.group({
        address : [''],
        city : [''],
        state : [''],
        pincode : [''],
        station : [''],
        gst : [''],
        bank_account : [''],
        bank_name : [''],
        ifsc_code : ['']
    }) 
  })
  ngOnInit() {
    let keys = Object.keys(this.user.controls.details['controls'])
    if(this.user_role!="company"){
      let setRole = this.user_role == "distributor"?'retailer':'distributor';
      let setParentId = localStorage.getItem('user_id');
      this.user.controls.user_details['controls'].user_role.setValue(setRole);
      this.user.controls.user_details['controls'].parent_id.setValue(setParentId);
      keys.map(each=>{
        this.user.controls.details['controls'][each].setValidators([Validators.required])
        this.user.controls.details['controls'][each].updateValueAndValidity();
      })
    }
    this.userService.superstockist().subscribe(ss_List=>{
      this.ss_list = ss_List['users'];
    })
    this.getData.user_role.valueChanges.subscribe(val=>{
      this.getData.parent_id.setValue('');
      let keys = Object.keys(this.user.controls.details['controls'])
      if(val != "company"){
        keys.map(each=>{
          this.user.controls.details['controls'][each].setValidators([Validators.required])
          this.user.controls.details['controls'][each].updateValueAndValidity();
        })
      }else{
        keys.map(each=>{
          this.user.controls.details['controls'][each].clearValidators()
          this.user.controls.details['controls'][each].updateValueAndValidity();
        })
      }
    })
    if(this.userdata){
      this.type="Edit";
      this.user.controls.user_details['controls'].user_password.clearValidators();
      this.user.controls.user_details['controls'].user_password.setValidators([Validators.minLength(4),Validators.maxLength(8)])
      this.user.controls.user_details['controls'].user_password.updateValueAndValidity();

      this.user.controls.user_details.patchValue(this.userdata)
      this.user.controls.user_details.patchValue({"status" : this.userdata.status.toString()});
    }
    if(this.cpData){
      this.user.controls.details.patchValue(this.cpData)
    }
  }
  back(){
    this.router.navigate(['/user'])
  }
  get getData(){
    return (this.user.controls.user_details['controls']);
  }
  create_user(){
    
    
    if(!this.user.valid){ return false}
     if(this.userdata){
       
      this.input = new FormData();
      Object.keys(this.user.controls.user_details['controls']).map(key=>{
        if(this.user.controls.user_details['controls'][key].value)
        this.input.append(key, this.user.controls.user_details['controls'][key].value);
      })
      Object.keys(this.user.controls.details['controls']).map(key=>{
        if(this.user.controls.details['controls'][key].value)
        this.input.append(key, this.user.controls.details['controls'][key].value);
      })
      
      this.userService.update_user(this.input,this.userdata._id.toString()).subscribe(
        resp=>{
          this.errorHandler.show_message(resp,'User has been edited successfully!!!','/user/');
        });
      }
      else{
        this.userService.add_user(this.user.value).subscribe(
          resp=>{
            this.errorHandler.show_message(resp,'User has been added successfully!!!','/user/');
          })
      }
  }
  

}
