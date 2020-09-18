import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Login } from '../classes/Login';
import { User } from '../classes/User';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm:FormGroup;
  login:Login;
  selectedUser:User;
  id:string;

  constructor(private fb:FormBuilder,private router:Router,private loginService:ServerService)

  {
    this.createForm();
   }

   createForm()
   {
    this.loginUserForm=this.fb.group(
      {
        Username: ['',Validators.required],
        Password: ['',Validators.required]
      }
    );
   }

  ngOnInit() {
    localStorage.clear();
    this.login=new Login("","");
    this.selectedUser=new User("","","","","","","",0);
    localStorage.setItem('CurrentComponent','LoginComponent');

  }

  onSubmit()
  {
      this.login=this.loginUserForm.value;

      this.loginService.GetUser(this.login.Username,this.login.Password)
      .subscribe(
        data=> {
          this.selectedUser=data;
                           
          if(data==null)
          {
            alert("Invalid username or password.");
          }
          else
          {
            if(data.IsBlocked!=true)
            {

                if(data.IsActive!=false)
                {
                  localStorage.setItem('Username',data.Username);
                  localStorage.setItem('Role',data.Role);
                  localStorage.setItem('Logged','Yes');
          
                  this.GetCookie(data.Username);


                  this.router.navigate(['']).then(()=>window.location.reload());

                  this.router.navigateByUrl("/home");
                }
                else
                {

                    alert("Invalid Username or Password!");
                                  
                }
                
             }
             else
             {
              alert("You are blocked!")
             }
          }
        },error=>
        {
          alert("Invalid Username or Password!")
          console.log(error);
        }

      )   
           
      this.loginUserForm.reset();

    }
    
 GetCookie(username:string)
  {
      this.loginService.GetCookie(username).subscribe(
        data=>
        {
          
        }
      )
  }
   
  }
