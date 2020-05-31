import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'username','role','Status','Action'];
  dataSource : any;
  selectedFood2 : string = '';
  constructor(private router:Router, private userService : UserService) { }

  ngOnInit() {
    this.generateUserData();
  }
  generateUserData(){
    if(localStorage.getItem('user_role')=="company"){
      this.userService.user_list().subscribe(userList=>{
        this.dataSource = new MatTableDataSource(userList['users']);
      })
    }
    else{
      this.userService.get_channel_partner_own().subscribe(userList=>{
        this.dataSource = new MatTableDataSource(userList['response']);
      })
    }
   

  }
  applyFilter(event) {
    const filterValue = event.value;
    if(filterValue == "all"){ 
      this.generateUserData();
    }else{
       this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
  }
 
  create_user(){
    this.router.navigate(['/user/create'])
  }
  details(id){
    this.router.navigate(['/user/detail',id])
  }
  inventory(id){
    this.router.navigate(['/user/inventory',id])
  }
}
