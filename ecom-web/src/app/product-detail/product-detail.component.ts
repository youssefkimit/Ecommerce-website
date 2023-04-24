import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../catalogue.service";
import {Product} from "../model/product.model";
import {AuthenticationService} from "../services/authentication.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  currentProduct;
  selectedFiles;
  progress: number | undefined;
  currentFileUpload: any;
  currentTime: number | undefined;
  public editPhoto: boolean | undefined;
  public mode: number=0;
 constructor(private router:Router,
             private route:ActivatedRoute,
             public cataService:CatalogueService,public authService:AuthenticationService,
             public caddyService:CaddyService
 ) {
 }

  ngOnInit(): void {

   let url=atob(this.route.snapshot.params['url']);
  this.cataService.getProduct(url).subscribe(data=>{
  this.currentProduct=data;
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
    this.cataService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  onAddProductToCaddy(p:Product) {
    /*if(!this.authService.isAuthenticated){
      this.router.navigateByUrl("/login");
    }
    else{*/
      this.caddyService.addProduct(p);
  /*  }*/
  }

  getTS() {
    return this.currentTime;
  }

  onProductDetails(p) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.cataService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }
}
