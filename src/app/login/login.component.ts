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
    sessionStorage.clear();
    this.login=new Login("","");
    this.selectedUser=new User("","","","","","","");
    sessionStorage.setItem('CurrentComponent','LoginComponent');

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
            sessionStorage.setItem('Username',data.Username);
            sessionStorage.setItem('Role',data.Role);
            sessionStorage.setItem('Logged','Yes');
    
            this.router.navigate(['']).then(()=>window.location.reload());
            this.router.navigateByUrl("/home");
          }
        },error=>
        {
          alert("Invalid Username or Password!")
          console.log(error);
        }

      )   
           
      this.loginUserForm.reset();

    }
   
  }
