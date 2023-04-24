import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../services/order.service";
import {Order} from "../model/order.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public mode:number=0;
  paymentAmount:number=0.0;
  panelStyle:string= "panel-default";

  currentOrder:Order=new Order();

  constructor(private router:Router, private route:ActivatedRoute,
              private orderService:OrderService) { }

  ngOnInit() {
    let id= this.route.snapshot.params['orderID']
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onParOrder(data) {
    console.log(data);
  }

}
