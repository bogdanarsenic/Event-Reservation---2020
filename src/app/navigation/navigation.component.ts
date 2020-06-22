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
      localStorage.setItem('CurrentComponent','HomeComponent');
      this.router.navigateByUrl('/home');
  }

  CurrentComponent()
  {
    return localStorage.getItem('CurrentComponent');
  }

  ShowLogin()
  {
    if(localStorage.jwt)
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
    if(!localStorage.jwt)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  CallLogout()
  {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
    
  IsAdmin()
  {
    if(localStorage.getItem('role')=="Admin")
        return true;
    else
        return false;
    
  }

  IsBuyer()
  {
    if(localStorage.getItem('role')=="Buyer")
      return true;
    else
      return false;
  }
  
  IsSeller()
  {
    if(localStorage.getItem('role')=="Seller")
      return true;
    else
      return false;
  }
}
