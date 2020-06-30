import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  user:User;
  users:User[];
  sellerId:string;
  IsActive:string

  byRole:FormGroup;
  byGender:FormGroup;
  byId:FormGroup;
  role:string;
  id:string;
  gender:string;
  korisnik:User;

  Type:string
  Role:string

  brojac:number

  searchedUsers:User[]
  searchUser:FormGroup
  filteringusers:User[];

  filterUserForm:FormGroup;

  Sort:string;
  ReverseSort:string;

  Clicked:boolean;
  ClickedId:boolean;
  constructor(private router:Router,private service:ServerService,private fb:FormBuilder) {
    
    this.createForm();
  }

  createForm()
   {
    this.searchUser=this.fb.group({
      Name: [''],
      Surname:[''],
      Username:['']
    });
   }
 
  ngOnInit()
   {
     this.brojac=0
     this.Clicked=false
     this.ClickedId=false
     this.role=""
     this.gender=""
     this.id=""
     this.Type=""
     this.Role=""
     this.Sort=""
     this.korisnik=new User("","","","","","","",0);
      this.user=new User("","","","","","","",0);
      this.users=[]
      this.filteringusers=[]

      if(this.isAdmin())
      {
        this.service.GetAllUsers().subscribe(
          data=>{

                this.users=data;
                this.filteringusers=data;
                this.searchedUsers=data;

          }
        )
      }   

      if(this.isSeller())
     {
        this.sellerId=sessionStorage.getItem('Username');
        this.service.GetAllUsersWhoReserved().subscribe(
          data=>
          {

              if(data.length==0)
              {
                alert("No users bought ticket for your event")
              }
              else
              {
                data.forEach(
                  x=>{
                    if(x.IsActive==true && this.users.findIndex(y=>y.Username==x.Username)==-1)
                    {
                       this.users.push(x);
                    }
                  }
                )
                
              }
          }
        )
    }
      
  }

  Block(user:User)
  {
      user.IsActive=false;
      user.IsBlocked=true;

      this.service.blockUser(user).subscribe(
        data=>
        {
        this.router.navigate(['/home']).then(()=>window.location.reload());
        }
      )  
  }

  Remove(user:User)
  {

      this.service.DeleteUser(user).subscribe(
        data=>
        {
        this.router.navigate(['/home']).then(()=>window.location.reload());
        }
      )
    
   
  }
 
  Search()
  {
      this.users=[]

      if(this.searchUser.value.Name!="" || this.searchUser.value.Surname!="" || this.searchUser.value.Username!="")
      {
            
            this.searchedUsers.forEach(
              x=>
              {
                  if((x.Name==this.searchUser.value.Name || this.searchUser.value.Name=="") && (x.Surname==this.searchUser.value.Surname || this.searchUser.value.Surname=="") && (x.Username==this.searchUser.value.Username || this.searchUser.value.Username==""))
                    {
                      if(this.users.findIndex(x=>x.Name==this.searchUser.value.Name && x.Surname==this.searchUser.value.Surname && x.Username==this.searchUser.value.Username)==-1)
                      {
                        this.users.push(x);
                      }
                    }
                }
            )
            
      }

      else
      {
         alert("You need to put some input!");
         this.users=this.searchedUsers;
      }

  }

  isAdmin()
  {
    if(sessionStorage.getItem('Role')=="Admin")
    return true;
    else 
    return false;
  }

  isSeller()
  {
    if(sessionStorage.getItem('Role')=="Seller")
    return true;
    else 
    return false;
  }

  isSuspitious(user:User)
  {
      if(user.NoQuit>=5)
      {
        return true;
      }
      return false;
  }

}
