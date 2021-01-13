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
          
                  this.GetSession(data.Username, data.Password);
                
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
    
 GetSession(username:string , password:string)
  {
      this.loginService.GetSession(username, password).subscribe(
        data=>
        {
            localStorage.setItem('Username',username);

            let jwt=data;

            let jwtData=jwt.split('.')[1]
            let decodedJwtJsonData=window.atob(jwtData)
            let decodedJwtData=JSON.parse(decodedJwtJsonData)
  
            localStorage.setItem('jwt',jwt);

            this.loginService.setToken();

            localStorage.setItem('Role',decodedJwtData.role);

            this.router.navigate(['']).then(()=>window.location.reload());

            this.router.navigateByUrl("/home");
        },
        error=>{
          alert("Something is wrong when getting session!");
        }
      
      )
  }
   
}
