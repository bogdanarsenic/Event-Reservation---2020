import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

 username:string
  
  constructor(public router:Router,private loginService:ServerService) { }
  

  ngOnInit() {

    if(localStorage.jwt)
    {
      this.checkToken();
    }
  }

  ShowLogin()
  {
    return localStorage.jwt?false:true;
  }

  checkToken()
  {
    var expiredDate=new Date(localStorage.getItem('tokenExpiresOn'));
    var now=new Date();

    if(now>expiredDate)
    {
      alert("Your token expired!");
      this.CallLogout();
    }
    else
    {
        var tokenExpiresOn=expiredDate.getTime()-now.getTime();
        this.loginService.autoLogout(tokenExpiresOn);
    }
    
  }

  CallLogout()
  {
    this.loginService.Logout();
  }
    
  IsAdmin()
  {
    return localStorage.getItem('Role')=="Admin"?true:false;
  }

  IsBuyer()
  {
    return localStorage.getItem('Role')=="Buyer"?true:false;

  }
  
  IsSeller()
  {
    return localStorage.getItem('Role')=="Seller"?true:false;
  }
}
