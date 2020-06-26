import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import {Event} from '../classes/Event';

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

locationId:string
constructor(private router:Router,private service:ServerService) { }

ngOnInit() {

    this.id=sessionStorage.getItem('EventId');
    this.pictures3=[]
    this.nesto=false;
    this.local="http://localhost:52294/";
    this.folder="Content/";
    this.clicked=false;
    
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

      }
    )
    

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

   
  isSeller()
  {
    if(sessionStorage.getItem('Role')=="Seller")
      return true;
    else
      return false;
  }
}





