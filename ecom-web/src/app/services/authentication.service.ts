import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users=[
    {username:"admin", password:"1234",roles:['USER','ADMIN']},
    {username:"user1", password:"1234",roles:['USER']},
    {username:"user2", password:"1234",roles:['USER']}
  ]
  public isAuthenticated: boolean | undefined;
  public userAuthenticated;
 token: string | undefined;
  constructor() { }

  login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username===username && u.password===password){
        user=u;
        this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    })
    if(user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.userAuthenticated));
    }
    else{
      this.isAuthenticated=false;
      this.userAuthenticated=undefined;
    }
  }

  public isAdmin(){
    if(this.userAuthenticated){
        if(this.userAuthenticated.roles.indexOf("ADMIN")>-1)
          return true;
    }
    return false;
  }

   public saveLocalUser(){
      if(this.userAuthenticated){
        if (typeof this.token === "string") {
          localStorage.setItem('authToken', this.token);
        }
      }
   }

   public loadAuthenticatedUserFroLocalStorage(){
    let t=localStorage.getItem('authToken');
    if(t){
      let user=JSON.parse(atob(t));
      this.userAuthenticated={username: user.username,roles: user.roles};
      this.isAuthenticated=true;
      this.token=t;
    }
   }

   public removeTokenLocalStorage(){
    localStorage.removeItem('authToken');
    this.userAuthenticated=undefined;
    this.isAuthenticated=false;
    this.token=undefined;
   }
}
