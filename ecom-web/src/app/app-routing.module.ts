import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CaddyComponent} from "./caddy/caddy.component";
import {ClientComponent} from "./client/client.component";
import {PaymentComponent} from "./payment/payment.component";
import {OrderComponent} from "./order/order.component";



const routes: Routes = [
  {path:'products/:p1/:p2',component:ProductsComponent},
  {path:'',redirectTo:'products/1/0',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'product-detail/:url',component:ProductDetailComponent},
  {path:'client', component:ClientComponent},
  {path:'caddy',component:CaddyComponent},
  {path:'payment/:orderID', component:PaymentComponent},
  {path:'order',component:OrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
