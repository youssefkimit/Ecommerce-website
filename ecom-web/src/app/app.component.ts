import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {CaddyService} from "./services/caddy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   categories;
   currentCategorie;
  constructor(private catService:CatalogueService,private router:Router,public authService:AuthenticationService,public caddyService:CaddyService) {
  }
  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFroLocalStorage();
    this.getCategories();
  }

  private getCategories() {
   this.catService.getResource("/categories")
     .subscribe(data=>{
       this.categories=data;
     },error => {
       console.log(error);
     })
  }

  getProductsByCat(c) {
    this.currentCategorie=c;
   this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/1/0')
  }

  onProductsPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0')
  }

  onProductsDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0')
  }

  onLogout() {
     this.authService.removeTokenLocalStorage();
     this.router.navigateByUrl('/login')
  }

  orderClient() {
    this.router.navigateByUrl('/order')
  }
}
