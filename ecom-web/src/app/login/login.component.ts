import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthenticationService,private router:Router) {

}
  onLogin(dataForm) {
    this.authService.login(dataForm.username,dataForm.password);
    if(this.authService.isAuthenticated){
      this.authService.saveLocalUser();
      this.router.navigateByUrl('')
    }
  }
}
