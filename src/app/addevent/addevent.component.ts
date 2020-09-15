import { Component, OnInit,NgZone } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {Location} from '../classes/Location';
import {Event} from '../classes/Event';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldControl} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import * as moment from 'moment';



@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  loc:Location;
  entering:number;
  leaving:number;
  eventUserForm:FormGroup;
  chooseLoc=false;
  templat:any;
  templong:any;
  index:number;
  address:string;
  address2:string;
  eventId:string;
  locId:string;
  userId:string;

  capacityVIP:number;
  capacityRegular:number;
  capacityFunPit:number;

  todayDate:Date = new Date();
  tomorrow:Date =  new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

  
  dateCheck:string;
  
  event:Event;
  
  geocoder:google.maps.Geocoder;
  infowindow:google.maps.InfoWindow;
  

  zoom = 12;
  center: google.maps.LatLngLiteral;


  centerMark:google.maps.LatLngLiteral;


  optionsMark:google.maps.MarkerOptions={

    title:'Marker title '
  };


  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 7,
  }


  constructor(private service:ServerService,private fb:FormBuilder,private router:Router,private ngZone:NgZone) 
  {
    this.createForm();
  }

   createForm()
   {
     this.eventUserForm=this.fb.group({

      Name: ["",[Validators.required,Validators.maxLength(50)]],
      Type: ['',Validators.required],
      Price:['',Validators.required],
      Capacity:['',Validators.required],
      EventDay:['',Validators.required],
      EventTime2:['00:00']
     })
   }
  ngOnInit() {
      this.center = {
        lat: 45.267136,
        lng: 19.833549,
      }
      this.userId=localStorage.getItem('Username');

      this.loc=new Location("",this.center.lat,this.center.lng,"");
      this.templat=""
      this.templong=""
      this.dateCheck=""
  }

  ItemsChanged(event)
  {
    
  }

  click(event: google.maps.MouseEvent) {
    this.templat=event.latLng.lat();
    this.templong=event.latLng.lng();

    
    this.centerMark=
    {
      lat:this.templat,
      lng:this.templong,
    }

    this.optionsMark={
      position:this.centerMark
      
    };

    this.getAddress(this.templat,this.templong);
    console.log(this.address);
    
  } 

  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      'location': latlng
    };
    geocoder.geocode(request, (results, status) => {
      if(status ==='OK') {
        if(results[0]){

        
        const address = results[0].formatted_address;
        this.display(address);
        
        }
        else{
          window.alert('No results found');
        }
      }
      else
      {
        window.alert('Geocoder failed due to: '+status);
      }
    });
  } 

  display(adresa){

    this.address2=adresa;
    
  }
  
  onSubmit()
  {
    this.event=this.eventUserForm.value;

    if(this.templat!="" && this.templat!="")
      {

        this.loc.Lattitude=this.templat;
        this.loc.Longitude=this.templong;
        this.loc.Address=this.address2;

        this.service.postLocation(this.loc).subscribe(
          data=>{
              this.loc.Id=data;
              this.AddEvent(this.loc);
             

          }
          
        )
      }
      
  else
      {
        alert("You must choose the location of apartment");
      }
    
  }

  AddEvent(loc:Location)
  {
    this.event.Lattitude=this.templat;
    this.event.Longitude=this.templong;
    this.event.Type=this.event.Type;
    this.event.Name=this.event.Name;
    this.event.LocationId=this.loc.Id;
    this.event.Place=loc.Address;
    this.event.Capacity=this.event.Capacity;
    this.event.Price=this.event.Price;
    this.event.SellerId=localStorage.getItem('Username');
    this.event.Status="NotApproved";
    this.event.CapacityRegular=Math.round(7/10*this.event.Capacity);
    this.event.CapacityVIP=Math.round(1/10*this.event.Capacity);
    this.event.CapacityFunPit=Math.round(2/10*this.event.Capacity);

    var nesto=moment(this.event.EventDay).format();

    this.event.EventTime2=nesto.split('T')[0]+"T"+this.event.EventTime2+":00";
    
    var date=new Date(this.event.EventTime2);

    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    
    this.event.EventTime=new Date(date.getTime() - userTimezoneOffset);

    this.service.postEvent(this.event).subscribe(
      data=>
      {
        if(data=="Already has event in that time and place")
        {
          alert("Already has event in that time and place");
        }
        else
        {
          this.eventId=data;
          this.updateSeller();
          this.router.navigateByUrl(`${this.eventId}/upload`);
        }
      }
    )
    this.eventUserForm.reset();
    }

  updateSeller()
  {
      this.service.PutSellerId(this.eventId,this.userId).subscribe(
        data=>
        {
          
        }
      )
  }
} 

  
