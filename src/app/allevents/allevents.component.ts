import { Component, OnInit } from '@angular/core';
import {Event} from '../classes/Event';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormBuilder } from '@angular/forms';
import { Geocoder } from '@agm/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {

id:string

allEvents:Event[]
eventBuyer:Event;

pictures1:string[]
pictures2:string[]
pictures3:string[]
local:string
folder:string
active:string
aps:string
brojac:number
filteredStatus:string

event:Event

id2:string

Clicked:boolean
  constructor(private router:Router,private service:ServerService,private fb:FormBuilder) { 

  this.createForm();
}

createForm()
 {
   
 }
  ngOnInit() {
    this.local="http://localhost:52294/";
    this.folder="Content/";
    this.brojac=0;

    this.allEvents=[]
    this.id=""
    
    this.Clicked=false;
    sessionStorage.setItem('CurrentComponent','AllEventsComponent');

    if(this.isAdmin())
    {
      this.service.GetAllEvents().subscribe(
        data=>{
          if(data==null)
            {
              alert("No apartments")
            }
          else
            {
              data.forEach(element=>
                {


                    element.Pictures=element.Pictures.replace(/\\/g,"/");
                    element.Pictures=element.Pictures.split(';');
                    element.FrontPicture=element.Pictures[0];
                    element.FrontPicture=this.local+this.folder+element.FrontPicture;
                    
                    this.pictures1=element.Pictures;
                    this.pictures1.forEach(element=>
                      {
                        this.pictures3=element.split('/');
                        element=this.pictures3[this.pictures3.length-1];
                      });
                      element.AllPictures=this.pictures1;
                    
                });
                this.allEvents=data;
     
        }
      }
      )
    }

    else if(this.isSeller())
    {
      this.id=sessionStorage.getItem('Username');

      this.service.GetEventbyUser(this.id).subscribe(
        data=>{

          if(data==null)
            {
              alert("No events by this host")
            }
          else
            {
            
              data.forEach(element=>
                {
                    
                  element.Pictures=element.Pictures.replace(/\\/g,"/");
                  element.Pictures=element.Pictures.split(';');
                  element.FrontPicture=element.Pictures[0];
                  element.FrontPicture=this.local+this.folder+element.FrontPicture;
                  
                  this.pictures1=element.Pictures;
                  this.pictures1.forEach(element=>
                    {
                      this.pictures3=element.split('/');
                      element=this.pictures3[this.pictures3.length-1];
                    });
                    element.AllPictures=this.pictures1;

                  
                });
                           

            this.allEvents=data;

            }
     
        }
      )
    }

    else
    {
      this.service.GetAllEvents().subscribe(
        data=>{
            if(data==null)
            {
              alert("No active apartments")
            }
            else{
          data.forEach(element=>
            {
                
                if(element.Status=="Active")
                {

                    this.active="Active";

                    element.Pictures=element.Pictures.replace(/\\/g,"/");
                    element.Pictures=element.Pictures.split(';');
                    element.FrontPicture=element.Pictures[0];
                    element.FrontPicture=this.local+this.folder+element.FrontPicture;
                    
                    this.pictures1=element.Pictures;
                    this.pictures1.forEach(element=>
                      {
                        this.pictures3=element.split('/');
                        element=this.pictures3[this.pictures3.length-1];
                      });
                      element.AllPictures=this.pictures1;
                      
                    this.eventBuyer=data[this.brojac];
                    this.allEvents.push(this.eventBuyer);
                    
                }
                this.brojac++;
              this.active="NotActive";

            });
       
            if(this.allEvents==null)
            {
              alert("No active apartments");
            }
     
        }

      }
      )
    }

    

  }
  
  ViewEvent(id:string,ev:Event)
  {
    sessionStorage.setItem('EventId',id);
    this.router.navigateByUrl('/viewevent');
  }
  
  Click()
  {
    this.Clicked=true;
  }

  Close()
  {
    this.Clicked=false;
  }

  ApproveEvent(event:Event){

    this.id2=String(event.Id);

    this.service.GetStatus(this.id2,event.Status)
    .subscribe(
      data =>{
       console.log("OK");
       this.router.navigate(['']).then(()=>window.location.reload());

      },
      error => {
        console.log(error);
      }
    )
  }

  isAdmin()
  {
    if(sessionStorage.getItem('Role')=='Admin')
    {
      return true;
    }
    else
      return false;
  }

  isSeller()
  {
    if(sessionStorage.getItem('Role')=='Seller')
    {
      return true;
    }
    else
      return false;
  }

  isBuyer()
  {
    if(sessionStorage.getItem('Role')=='Buyer')
    {
      return true;
    }
    else
      return false;
  }


  IsLogged()
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

  isActive()
  {
    if(this.active=="Active")
    {
        return true;
    }
    else
    {
      return false;
    }
  }

}
