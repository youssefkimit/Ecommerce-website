import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CaddyService} from "./caddy.service";
import {CatalogueService} from "../catalogue.service";
import {Order} from "../model/order.model";
import {HttpClient} from "@angular/common/http";
import {Client} from '../model/client.model';
import {ItemProduct} from "../model/item-product.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order=new Order();
  public item_product: IterableIterator<ItemProduct> | undefined;
  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){}

  public setClient(client:Client){
    this.order.client=client;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
    this.item_product=this.caddyService.getCurrentCaddy().items.values();
    for(let pi of this.item_product){
      this.order.products.push(pi);
    }

  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      // @ts-ignore
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/orders/"+id);
  }
}
