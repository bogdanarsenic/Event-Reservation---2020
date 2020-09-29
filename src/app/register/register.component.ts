import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../classes/User';
import { Login } from '../classes/Login';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../validator/customValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  korisnik:User;
  registerUserForm:FormGroup;
  user:User;
  currentUser:Login;
  validationMessage:string="";

  constructor (private fb:FormBuilder,private registerService:ServerService, private router:Router){
    this.createForm();
  }

  createForm()
  {
    this.registerUserForm=this.fb.group({
      Username: ["",[Validators.required,Validators.maxLength(50)]],
      
      Password:["",[
        Validators.required,CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{hasSpecialCharacters: true}),
        Validators.minLength(8),
        Validators.maxLength(50)
      ]],
      Name:['',[Validators.required,Validators.maxLength(30)]],
      Surname:['',[Validators.required,Validators.maxLength(30)]],
      DateOfBirth:['',Validators.required],
      Gender:['',Validators.required]
    });

  }
  ngOnInit() {
    
    localStorage.clear();
    this.korisnik=new User("","","","","","","",0);
    this.currentUser=new Login("","");
    localStorage.setItem('CurrentComponent','RegisterComponent');
  }

  onSubmit()
  {
    this.korisnik=this.registerUserForm.value;
    this.currentUser.Username=this.korisnik.Username;
    this.currentUser.Password=this.korisnik.Password;
    

    console.log(this.korisnik);

    this.registerService.RegistrationBuyer(this.korisnik).subscribe(
      data=>{      
              
        if(data=="Username already exists!")
        {
          alert("Username already exists!")
        }
        else
        {

        this.registerService.GetUser(this.korisnik.Username,this.korisnik.Password)
          .subscribe(
            res=>
            {
            

                localStorage.setItem('Logged', "Yes")
                localStorage.setItem('Role', "Buyer")
                localStorage.setItem('Username',this.korisnik.Username);
                this.GetSession(this.korisnik.Username);
                this.router.navigate(['']).then(()=>window.location.reload());
                this.router.navigateByUrl("/home");
                
            }
          )

        } 
        
      },error => {
        alert("Username already exists!")
          console.log(error);
      }
    )
    
  
    this.registerUserForm.reset();
    
  }
  GetSession(username:string)
  {
      this.registerService.GetSession(username).subscribe(
        data=>
        {
          
        }
      )
  }
}
