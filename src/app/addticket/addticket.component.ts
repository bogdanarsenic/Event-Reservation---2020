import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Event} from '../classes/Event';
import { User } from '../classes/User';
import { Ticket } from '../classes/Ticket';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {

  id:string
  userId:string

  ticketId:string
  sellerId:string



  reservationUserForm:FormGroup;

  price:number

  priceTemporal:number

  noPoints:number

  pointsTemp:number

  popust:boolean

  event:Event
  typeOfUser:string
  capacity:number;
  capacityVIP:number;
  capacityRegular:number;
  capacityFunPit:number;


  buyer:string;

  user:User
  ticket:Ticket

  constructor(private router:Router,private service:ServerService,private fb:FormBuilder)
  {
     this.createForm();
  }
 createForm()
   {
    this.reservationUserForm=this.fb.group({

      noTickets: [1,Validators.required],
      Type: ['',Validators.required],
     })
   }

  ngOnInit() {

    this.isUser();
    
    this.sellerId="";
    this.id=localStorage.getItem('EventId');
    this.userId=localStorage.getItem('Username');
    this.popust=false;
    this.ticket=new Ticket("","","",0,"","","");
    this.buyer="";

    this.service.GetEvent(this.id).subscribe(
      data=>{

          this.price=data.Price;  
          this.capacity=data.Capacity;
          this.capacityFunPit=data.CapacityFunPit;
          this.capacityRegular=data.CapacityRegular;
          this.capacityVIP=data.CapacityVIP;
          this.event=data;   
          this.sellerId=data.SellerId; 

      }
    )

    this.service.GetUserByUsername(this.userId).subscribe(
      data=>{

          this.noPoints=data.Points;   
          this.typeOfUser=data.Type;   
          this.user=data;  
          this.buyer=data.Name+" "+data.Surname; 

      }
    )
  }

  onRegular()
  {     
      this.pointsTemp=this.noPoints;
      this.priceTemporal=this.price*this.reservationUserForm.value.noTickets;  

      this.pointsTemp=this.pointsTemp+(this.priceTemporal/1000)*133

      if(this.pointsTemp>=3000 && this.pointsTemp<4000)
        {
          this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
        }
      else if(this.pointsTemp>=4000)
      {
        this.priceTemporal=this.priceTemporal-4*this.priceTemporal/100;
      }
      else
      {
        this.priceTemporal=this.price*this.reservationUserForm.value.noTickets;  
      }

  }

  onFunPit()
  {
     this.pointsTemp=this.noPoints;
     this.priceTemporal=this.reservationUserForm.value.noTickets*this.price*2;

     this.pointsTemp=this.pointsTemp+(this.priceTemporal/1000)*133

     if(this.pointsTemp>=3000 && this.pointsTemp<4000)
       {
         this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
       }
     else if(this.pointsTemp>=4000)
     {
       this.priceTemporal=this.priceTemporal-4*this.priceTemporal/100;
     }
     else
     {
      this.priceTemporal=this.reservationUserForm.value.noTickets*this.price*2;
     }


  }

  onVIP()
  {
    this.pointsTemp=this.noPoints;
    this.priceTemporal=this.reservationUserForm.value.noTickets*this.price*4;

    this.pointsTemp=this.pointsTemp+(this.priceTemporal/1000)*133

     if(this.pointsTemp>=3000 && this.pointsTemp<4000)
       {
         this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
       }
     else if(this.pointsTemp>=4000)
     {
       this.priceTemporal=this.priceTemporal-4*this.priceTemporal/100;
     }
     else
     {
      this.priceTemporal=this.reservationUserForm.value.noTickets*this.price*4;
     }
  }


  onSubmit()
  {
    if((this.reservationUserForm.value.Type=="VIP" && this.capacityVIP<this.reservationUserForm.value.noTickets) || (this.reservationUserForm.value.Type=="Regular" && this.capacityRegular<this.reservationUserForm.value.noTickets) || (this.reservationUserForm.value.Type=="FunPit" && this.capacityFunPit<this.reservationUserForm.value.noTickets))
    {
      alert("There is no that many tickets available of this type")
    }
    else
    {

      this.setStatus();

      this.ticket.Buyer=this.buyer;
      this.ticket.EventTime=String(this.event.EventTime);
      this.ticket.ManifestationId=this.id;
      this.ticket.Price=this.priceTemporal;
      this.ticket.Status="Reserved";
      this.ticket.Type=this.reservationUserForm.value.Type;
      this.ticket.SellerId=this.sellerId;

      this.service.postTicket(this.ticket).subscribe(
        data=>
        {
            this.ticketId=data;
            this.update();
            this.router.navigate(['/alltickets']).then(()=>window.location.reload());
        }
      )
     
     }

  }

  setStatus()
  {
    this.noPoints=this.pointsTemp;

    if(this.noPoints>=4000)
    {
        this.typeOfUser="Gold";
    }
    else if(this.noPoints>=3000)
    {
        this.typeOfUser="Silver";
    }
    else
    {
        this.typeOfUser="Bronze";
    }   
    this.user.Type=this.typeOfUser;
    this.user.Points=this.noPoints;

    this.capacity=this.capacity-this.reservationUserForm.value.noTickets;
    
    if(this.reservationUserForm.value.Type=="VIP")
    {
      this.capacityVIP=this.capacityVIP-this.reservationUserForm.value.noTickets;
    }
    else if(this.reservationUserForm.value.Type=="FunPit")
    {
      this.capacityFunPit=this.capacityFunPit-this.reservationUserForm.value.noTickets;
    }
    else
    {
      this.capacityRegular=this.capacityRegular-this.reservationUserForm.value.noTickets;
    }

    this.event.Capacity=this.capacity;
    this.event.CapacityVIP=this.capacityVIP;
    this.event.CapacityFunPit=this.capacityFunPit;
    this.event.CapacityRegular=this.capacityRegular;
  }

  update()
  {
    this.user.TicketId=this.ticketId;

    this.service.ChangeUserStatus(this.user).subscribe(
      data=>
      {

      }
    )

    this.service.ChangeEventCapacity(this.event).subscribe(
      data=>
      {
        
      }
    )
  }

  isUser()
  {
    if(localStorage.getItem('Role')=='User')
    {
        return true;
    }
      return this.router.navigateByUrl("/home");
  }

}
