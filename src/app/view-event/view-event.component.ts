import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import {Event} from '../classes/Event';
import { DatePipe } from '@angular/common';
import { Ticket } from '../classes/Ticket';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

id:string
pictures1:string[]
pictures2:string[]
pictures3:string[]
local:string
folder:string
active:string
aps:string
temp:string
nesto:boolean

address:string

clicked:boolean

zoom = 12;

event:Event;
lng:number
lat:number

tickets:Ticket[]

datePipe = new DatePipe('en-US');

todayDate=Date.now();

today = this.datePipe.transform(this.todayDate, 'MM/dd/yyyy HH:mm:ss');

locationId:string
constructor(private router:Router,private service:ServerService) { }

ngOnInit() {

    if(localStorage.getItem('EventId')==null)
    {
      return this.router.navigateByUrl("/home");
    }
    
    this.id=localStorage.getItem('EventId');
    this.pictures3=[]
    this.nesto=false;
    this.local="http://localhost:52294/";
    this.folder="Content/";
    this.clicked=false;
    this.tickets=[]
    this.event=new Event("","","",0,"","",0,"","","",0,0,"","","","","");
    
    this.service.GetEvent(this.id).subscribe(
      data=>{

        data.Pictures=data.Pictures.replace(/\\/g,"/");
        this.pictures1=data.Pictures.split(';');
        data.FrontPicture=this.pictures1[0];
        data.FrontPicture=this.local+this.folder+data.FrontPicture;

        this.pictures1.forEach(element=>
          {
            this.pictures2=element.split('/');
            this.temp=this.local+this.folder+this.pictures2[this.pictures2.length-1];
            this.pictures3.push(this.temp);
          });
        
        this.address=data.Place;
        this.locationId=data.LocationId;
          
        
        this.event=data;   
        
        this.event.EventTime=data.EventTime.replace('T'," ");

      }
    )
    

  }

  Delete(event:Event)
  {
    this.service.DeleteEvent(event)
      .subscribe(
        data => {

          console.log('ok');
          
        },
        error => {
          console.log(error);
        }
      )
      this.router.navigate(['/home']).then(()=>window.location.reload());
  }

  showPlace()
  {
    this.clicked=true;
    this.service.GetLongLat(this.locationId).subscribe(
      data=>
      {
        this.lat=data.Lattitude;
        this.lng=data.Longitude;
      }
    )
  }

  isPast(event:Event)
  {
    let eventTime=new Date(this.event.EventTime);
    let todayTime=new Date(this.today);
    if(eventTime<todayTime)
    {
      return true;
    }
    return false;
  }

  hasReservation(event:Event)
  {
    this.service.GetAllTicketsEvent(event.Id).subscribe(
      data=>
      {
          this.tickets=data;
      }
    )

    if(this.tickets.length==0)
    {
        return false;
    }
    return true;
  }
   
  isSeller()
  {
    if(localStorage.getItem('Role')=="Seller")
      return true;
    else
      return false;
  }

  isAdmin()
  {
    if(localStorage.getItem('Role')=="Admin")
      return true;
    else
      return false;
  }

  isBuyer()
  {
    if(localStorage.getItem('Role')=="Buyer")
      return true;
    else
      return false;
  }
}





