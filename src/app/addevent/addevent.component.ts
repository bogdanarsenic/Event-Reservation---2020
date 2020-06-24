import { Component, OnInit,NgZone } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {Location} from '../classes/Location';
import {Event} from '../classes/Event';


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
  
  
  event:Event;
  
  geocoder:google.maps.Geocoder;
  infowindow:google.maps.InfoWindow;
  

  zoom = 12;
  center: google.maps.LatLngLiteral;


  centerMark:google.maps.LatLngLiteral;


  optionsMark:google.maps.MarkerOptions={
    position:this.center,
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

      Name: ['',Validators.required],
      Type: ['',Validators.required],
      Price:['',Validators.required],
      Capacity:['',Validators.required],
      EventTime:['',Validators.required],

     })
   }
  ngOnInit() {
      this.center = {
        lat: 45.267136,
        lng: 19.833549,
      }

      this.loc=new Location("",this.center.lat,this.center.lng,"");
      this.templat=""
      this.templong=""
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
    this.event.SellerId=sessionStorage.getItem('Username');
    this.event.Status="NotActive";
    

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
          this.router.navigateByUrl(`${this.eventId}/upload`);
        }
      }
    )
    this.eventUserForm.reset();
    }
  } 
