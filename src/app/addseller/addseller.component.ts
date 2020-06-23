import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../classes/Login';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';

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
      Username: ['',Validators.required],
      Password:['',Validators.required],
      Name:['',Validators.required],
      Surname:['',Validators.required],
      Gender:['',Validators.required]
    });

  }
  ngOnInit() {
    sessionStorage.setItem('CurrentComponent','AddSellerComponent');
    this.korisnik=new User("","","","","","","");
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

}
