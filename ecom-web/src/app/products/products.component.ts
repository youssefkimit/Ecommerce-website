import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {Product} from "../model/product.model";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products;
  editPhoto: boolean | undefined;
  currentProduct: any;
   selectedFiles;
   progress: number | undefined;
   currentFileUpload: any;
   currentTime: number | undefined;
   title: String | undefined;
   timestamp:number=0;
  constructor(
    public catService:CatalogueService,
    private route:ActivatedRoute,private router:Router, public authService:AuthenticationService,public caddyService:CaddyService) {}
  ngOnInit() {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        let p1=this.route.snapshot.params['p1'];
        if(p1 == 1){
          this.title="produits sélectionnés"
          this.getProducts("/products/search/selectedProducts")
        }else if(p1 == 2){
          let idCat=this.route.snapshot.params['p2'];
          this.title="produits de la catégories"+idCat;
          this.getProducts('/categories/'+idCat+'/products')
        }else if(p1 == 3){
          this.title="produits en promotion";
          this.getProducts('/products/search/promoProducts')
        }else if(p1 == 4){
          this.title="produits disponibles"
          this.getProducts('/products/search/dispoProducts')
        }else if(p1 == 5){
          this.title="produits recherchés"
          this.getProducts('/products/search/dispoProducts')
        }
      }
    });
    let p1=this.route.snapshot.params['p1'];
    if(p1 == 1){
      this.getProducts("/products/search/selectedProducts")
    }
  }

  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data=>{
        this.products=data;
      },error => {
        console.log(error);
      })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
   this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.timestamp=Date.now();
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  getTS() {
    return this.timestamp;
  }

  onProductDetails(p:Product) {
    let url=btoa(p._links.product.href);
    this.router.navigateByUrl("product-detail/"+url);
  }

  onAddProductToCaddy(p: Product) {
   this.caddyService.addProductToCaddy(p);
  }
}
