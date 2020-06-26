import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  korisnik:User;
  user:User;
  registerUserForm:FormGroup;
  id:string;

  constructor(private editService:ServerService,private router:Router,private fb:FormBuilder) {
      this.createForm();
   }

   createForm()
   {
    this.registerUserForm=this.fb.group({
      
      Password: ['',Validators.required],
      Name:['',Validators.required],
      Surname:['',Validators.required],

    });
   }
  ngOnInit() {

    this.user=new User("","","","","","","",0);

    this.id=sessionStorage.getItem('Username');
    this.getUser();
   
    
  }

  getUser():any{
      this.editService.GetUserByUsername(this.id).subscribe(
      data=>{

          this.user=data;
          this.registerUserForm.value.Password=this.user.Password;
          this.registerUserForm.value.Name=this.user.Name;
          this.registerUserForm.value.Surname=this.user.Surname;


          console.log(this.registerUserForm);

      },
      err=>{
        alert("Something went wrong");
      })
  }

  get f() { return this.registerUserForm.controls; }

  onSubmit()
  {
      this.Update(this.user)
  }

  Update(user:User)
  {

    this.user.Username=this.id;
    this.user.Password=this.registerUserForm.value.Password;
    this.user.Name=this.registerUserForm.value.Name;
    this.user.Surname=this.registerUserForm.value.Surname;


    this.editService.PutUser(this.user).subscribe(
      data=>{

             console.log('ok');
             this.router.navigate(['']);
                
            },
          )
    
  }



}
