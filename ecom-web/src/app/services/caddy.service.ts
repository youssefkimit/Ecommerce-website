import {ItemProduct} from '../model/item-product.model';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {AuthenticationService} from './authentication.service';
import {Caddy} from '../model/caddy.model';
import {Client} from '../model/client.model';
@Injectable({
  providedIn: 'root'
})
export  class CaddyService{
  public currentCaddyName:string="Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public caddies:Map<string,Caddy>=new Map();
  constructor(private authService:AuthenticationService){
    let caddies=localStorage.getItem(this.currentCaddyName)
    if(caddies){
      this.caddies=JSON.parse(caddies)
    }else {
      let caddy = new Caddy(this.currentCaddyName)
      this.caddies.set(this.currentCaddyName,caddy)
    }

    if(this.authService.isAuthenticated) {
      this.loadCaddyFromLocalStorage();
    }
    else{
      this.caddies[this.currentCaddyName]=new Caddy(this.currentCaddyName);
    }
  }

  public addProductToCaddy(product:Product):void{
    let caddy=this.caddies.get(this.currentCaddyName);
    // @ts-ignore
    let productItem:ItemProduct=caddy?.items.get(product.id);
    if(productItem) {
      // @ts-ignore
      productItem.quantity+=product.quantity
    }else{
      productItem=new ItemProduct();
      productItem.price=product.currentPrice;
      productItem.quantity=product.quantity;
      productItem.product=product;
      caddy?.items.set(product.id,productItem);
      this.saveCaddy()
    }
  }
  public removeProduct(id: number):void{
    let caddy=this.caddies.get(this.currentCaddyName);
    if(caddy != undefined)
    caddy.items.delete(id);
    this.saveCaddy();
  }
  public addProduct(product:Product){
    this.addProductToCaddy(product)
    this.saveCaddy();
  }
  public loadCaddyFromLocalStorage(){
    let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.userAuthenticated.username);
    this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c=>{
      let cad=localStorage.getItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+c.name);
      this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
    })
  }
  public getCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }

  saveCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }

  emptyCaddy(){
    this.caddies=new Map();
    this.listCaddies=[];
  }

  getTotalCurrentCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;
  }

  addNewCaddy(c: { num: number; name: string }) {
    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.userAuthenticated.username,JSON.stringify(this.listCaddies));
  }

  setClient(client: Client) {
    this.getCaddy().client=client;
    return this.getCurrentCaddy()
  }

  getCurrentCaddy() :Caddy{
    // @ts-ignore
    return this.caddies.get(this.currentCaddyName);
  }

  getTotal() :number{
   let total=0
    let items:IterableIterator<ItemProduct>=this.getCurrentCaddy().items.values();
   for (let pi of items){
     // @ts-ignore
     total+=pi.price*pi.quantity
   }
   return total;
  }

}
