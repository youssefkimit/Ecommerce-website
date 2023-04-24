import {Component, OnInit} from '@angular/core';
import {Client} from "../model/client.model";
import {AuthenticationService} from "../services/authentication.service";
import {CaddyService} from "../services/caddy.service";
import {Router} from "@angular/router";
import {OrderService} from "../services/order.service";
import {Caddy} from "../model/caddy.model";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public mode:number=0;
  public message:String="Récap de votre commande";
  panelStyle:string= "panel-default";
  constructor(public orderService:OrderService,
              private authService:AuthenticationService,
              public caddyService:CaddyService,
              private router:Router) { }

  ngOnInit() {
  }

  onSaveClient(client:Client){
    client.username="user1";
   this.caddyService.setClient(client);
    this.orderService.setClient(client);
    this.orderService.loadProductsFromCaddy();

    this.mode=1;
  }

  onOrder() {
    this.orderService.order.totalAmount=this.caddyService.getTotal();
    this.orderService.submitOrder().subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="panel-success";
      this.message="votre commande à était bien effectuer";

    },err=>{
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }

}




