import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  orders
  constructor(public catService:CatalogueService,private router:Router,private route:ActivatedRoute,public authService:AuthenticationService) {
  }
  ngOnInit(): void {

        this.getOrders("/allOrders");

  }

  private getOrders(url) {
    this.catService.getResource(url)
      .subscribe(data=>{
        this.orders=data;
      },error => {
        console.log(error);
      })
  }

}
