import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  user_id :String;
  inventoryDetails =[];
  displayedColumns = ['Name','Price','Quantity']
  constructor(private userService:UserService, private activeRoute: ActivatedRoute, private router: Router) { 
    this.activeRoute.paramMap
    .subscribe(params => {
        if(params.get('id') !== this.user_id) {
            this.user_id= params.get('id');
            //Do things with new parameter - e.g. reload data
        }
    });
  }

  ngOnInit() {
    this.userService.get_inventory(this.user_id).subscribe(inventory=>{
      this.inventoryDetails = inventory['product'];
    })
  }
  back(){
    this.router.navigate(['user']);
  }

}
