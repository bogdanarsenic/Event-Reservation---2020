import { Component, OnInit } from '@angular/core';
import {Event} from '../classes/Event';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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

searchedEvents:Event[]

pictures1:string[]
pictures2:string[]
pictures3:string[]
local:string
folder:string
active:string
aps:string
brojac:number
brojac2:number
filteredStatus:string

datum:Date

Sort:string
Type:string

event:Event

filteredEvents : Event[] 

searchEvent:FormGroup

id2:string

Clicked:boolean
  constructor(private router:Router,private service:ServerService,private fb:FormBuilder) { 

  this.createForm();
}

createForm()
 {
  this.searchEvent=this.fb.group({
    Name: [''],
    Address:[''],
    Location:[''],
    FromPrice:[0],
    ToPrice:[0],
    FromDate:[''],
    ToDate:[''],
  });
 }
  ngOnInit() {
    this.local="http://localhost:52294/";
    this.folder="Content/";
    this.brojac=0;
    this.brojac2=0;
    this.Sort="";
    this.searchedEvents=[]

    this.Type="";
    this.allEvents=[]
    this.id=""
    
    
    this.Clicked=false;
    sessionStorage.setItem('CurrentComponent','AllEventsComponent');

    if(this.isAdmin())
    {
      this.service.GetAllEvents().subscribe(
        data=>{
          if(data.length==0)
            {
              alert("No apartments")
            }
          else
            {
              data.forEach(element=>
                {

                    element.EventTime=element.EventTime.replace('T'," ");
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
                    element.City=element.Place.split(',')[1];
                    element.State=element.Place.split(',')[2];
                });
                
                this.allEvents=data;
                this.filteredEvents=this.allEvents;
                this.searchedEvents=this.allEvents;
     
        }
      }
      )
    }

    else if(this.isSeller())
    {
      this.id=sessionStorage.getItem('Username');

      this.service.GetEventbyUser(this.id).subscribe(
        data=>{

          if(data.length==0)
            {
              alert("No events by this host")
            }
          else
            {
            
              data.forEach(element=>
                {
                  
                  element.EventTime=element.EventTime.replace('T'," ");
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


                    element.City=element.Place.split(',')[1];
                    element.State=element.Place.split(',')[2];
                });

                this.allEvents=data;
                this.filteredEvents=this.allEvents;
                this.searchedEvents=this.allEvents;
            }
     
        }
      )
    }

    else
    {
      this.service.GetAllEvents().subscribe(
        data=>{
            if(data.length==0)
            {
              alert("No active apartments")
            }
            else{
          data.forEach(element=>
            {
                
                if(element.Status=="Approved" && element.IsActive==true)
                {

                    this.active="Approved";

                    element.EventTime=element.EventTime.replace('T'," ");
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
                      element.City=element.Place.split(',')[1];
                      element.State=element.Place.split(',')[2];
                    this.eventBuyer=data[this.brojac];
                    this.allEvents.push(this.eventBuyer);
                    
                }
                this.brojac++;
              this.active="NotActive";
              this.filteredEvents=this.allEvents;
              this.searchedEvents=this.allEvents;

            });
     
        }

      }
      )
    }

    

  }

  Search()
  {
    this.allEvents=[]

    if(this.searchEvent.value.Name!="" || this.searchEvent.value.FromPrice!=0 ||this.searchEvent.value.ToPrice!=0 || (this.searchEvent.value.FromDate!="" && this.searchEvent.value.ToDate!="") || this.searchEvent.value.Location!="" || this.searchEvent.value.Address!="")
    {   
          this.searchedEvents.forEach(
            x=>
            {
                var temp=String(x.EventTime);
                temp=temp.split(' ')[0];
                
                this.datum=new Date(temp);
                if((x.Name==this.searchEvent.value.Name || this.searchEvent.value.Name=="") && ((this.datum<=new Date(this.searchEvent.value.ToDate) && this.datum>=new Date(this.searchEvent.value.FromDate))|| (this.searchEvent.value.FromDate=="" && this.searchEvent.value.FromDate==""))  && ((x.Price<=this.searchEvent.value.ToPrice && x.Price>=this.searchEvent.value.FromPrice)|| (this.searchEvent.value.ToPrice==0 && this.searchEvent.value.FromPrice==0)) && (x.Place==this.searchEvent.value.Address || this.searchEvent.value.Address=="") && (x.City==this.searchEvent.value.Location || x.State==this.searchEvent.value.Location || this.searchEvent.value.Location==""))
                  {
                    if(this.allEvents.findIndex(x=>x.Name==this.searchEvent.value.Name && x.Place==this.searchEvent.value.Address && (x.City==this.searchEvent.value.Location || x.State==this.searchEvent.value.Location))==-1)
                    {
                          this.allEvents.push(x);
                    }
                  }
              }
          )
          
    }
    
    else
    {
       alert("You need to put some input!");
       this.allEvents=this.searchedEvents;
    }

    if(this.allEvents.length==0)
    {
      alert("No results!");
      this.allEvents=this.searchedEvents;
    }

  }



  filterChange() {

    this.brojac2++

    if(this.brojac2%2==1)
    {
      this.allEvents = this.allEvents.filter(x => 
        (x.Capacity >0)
      );      
    }
    else
      {
          this.allEvents=this.filteredEvents;
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
