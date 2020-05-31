import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order_id : String;
  order : any;
  total =0;
  displayedColumns = ['Name','Price','Quantity','Subtotal'];
  constructor(private activeRoute : ActivatedRoute, private orderService : OrderService, private router:Router) {
    this.activeRoute.paramMap
        .subscribe(params => {
            if(params.get('id') !== this.order_id) {
                this.order_id= params.get('id');
                //Do things with new parameter - e.g. reload data
            }
        });
   }

  ngOnInit() {
    this.orderService.read_order(this.order_id).subscribe((product)=>{
      this.order = product['response'][0];
      this.order.product_details.map(each=>{
        this.total = this.total+(each.quantity*each.price);
      })
    })
  }
  back(){
    this.router.navigate(['order'])
  }
}
