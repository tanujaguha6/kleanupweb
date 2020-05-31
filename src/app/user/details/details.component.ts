import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user_id : String;
  user : any;
  cpData : any;
  data :Boolean;
  constructor(private activeRoute : ActivatedRoute, private userService : UserService) {
    this.activeRoute.paramMap
    .subscribe(params => {
        if(params.get('id') !== this.user_id) {
            this.user_id= params.get('id');
            //Do things with new parameter - e.g. reload data
        }
    });
}

ngOnInit() {
this.userService.get_user(this.user_id).subscribe(async (userData)=>{
   this.user = userData['user'];
  if(this.user.user_role != "company"){
    await this.userService.get_channel_partner(this.user._id).subscribe(async(cpData)=>{
       this.cpData = cpData['user'][0];
       if(this.cpData) this.data = true;
    });
  }
  else{
    this.data = this.user?true:false;
  }
})
}

}
