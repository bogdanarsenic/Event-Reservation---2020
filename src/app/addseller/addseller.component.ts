import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../classes/Login';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { CustomValidators } from '../validator/customValidator';

@Component({
  selector: 'app-addseller',
  templateUrl: './addseller.component.html',
  styleUrls: ['./addseller.component.css']
})
export class AddsellerComponent implements OnInit {

  
  korisnik:User;
  registerUserForm:FormGroup;
  user:User;
  currentUser:Login;

  constructor(private router:Router,private fb:FormBuilder,private registerService:ServerService) 
    {
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
      Name:["",[Validators.required,Validators.maxLength(30)]],
      Surname:["",[Validators.required,Validators.maxLength(30)]],
      DateOfBirth:['',Validators.required],
      Gender:['',Validators.required]
    });

  }
  ngOnInit() {

    this.isAdmin();
    localStorage.removeItem('EventId');
    localStorage.setItem('CurrentComponent','AddSellerComponent');
    this.korisnik=new User("","","","","","","",0);
    this.currentUser=new Login("","");
  }

  onSubmit()
  {
    this.korisnik=this.registerUserForm.value;
    this.currentUser.Username=this.korisnik.Username;
    this.currentUser.Password=this.korisnik.Password;

    console.log(this.korisnik);

    this.registerService.RegistrationSeller(this.korisnik).subscribe(
      data=>{

        if(data=="Username already exists!")
        {
          alert("Username already exists!")
        }          

        console.log('Seller has been added');
        
      },error => {
        alert("Username already exists!")
          console.log(error);
      }
    )
     
    
    
    this.router.navigateByUrl("/home");
    this.registerUserForm.reset();
    
  }

  isAdmin()
  {
    if(localStorage.getItem('Role')=='Admin')
    {
        return true;
    }
      return this.router.navigateByUrl("/home");
  }

}
