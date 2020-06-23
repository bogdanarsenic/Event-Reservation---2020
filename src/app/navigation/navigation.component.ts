import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

 
  
  constructor(public router:Router) { }
  

  ngOnInit() {
  }

  BackToCheck()
  {
    sessionStorage.setItem('CurrentComponent','HomeComponent');
      this.router.navigateByUrl('/home');
  }

  CurrentComponent()
  {
    return sessionStorage.getItem('CurrentComponent');
  }

  ShowLogin()
  {
    if(sessionStorage.getItem('Logged')=="Yes")
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  ShowLogout()
  {
    if(sessionStorage.getItem('Logged')=="Yes")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  CallLogout()
  {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
    
  IsAdmin()
  {
    if(sessionStorage.getItem('Role')=="Admin")
        return true;
    else
        return false;
    
  }

  IsBuyer()
  {
    if(sessionStorage.getItem('Role')=="Buyer")
      return true;
    else
      return false;
  }
  
  IsSeller()
  {
    if(sessionStorage.getItem('Role')=="Seller")
      return true;
    else
      return false;
  }
}
