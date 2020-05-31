import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice_id : String;
  invoice :any;
  total = 0;
  total2 = 0;
  displayedColumns = ['Name','Quantity','Price','Subtotal'];
  constructor(private activedRote : ActivatedRoute , private orderService : OrderService, private router:Router) {
    this.activedRote.paramMap
    .subscribe(params => {
        if(params.get('id') !== this.invoice_id) {
            this.invoice_id= params.get('id');
        }
    });
   }

  ngOnInit() {
    this.orderService.get_invoice_details(this.invoice_id).subscribe((data)=>{
      
      this.invoice = data['response'][0];
      this.invoice.product_details.map(prod=>{
        this.total = this.total+(prod.quantity*prod.price);
      })
      if(this.invoice.order_details.length){
        this.invoice.order_details[0].product_details.map(prod=>{
          this.total2 = this.total2+(prod.quantity*prod.price);
        })
      }
    });
  }
  back(){
    this.router.navigate(['invoice']);
  }
}
