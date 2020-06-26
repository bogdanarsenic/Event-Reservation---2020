import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {

  id:string
  userId:string

  reservationUserForm:FormGroup;

  price:number

  priceTemporal:number

  noPoints:number

  pointsTemp:number

  popust:boolean

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

  ngOnInit(): void {
    this.id=sessionStorage.getItem('EventId');
    this.userId=sessionStorage.getItem('Username');
    this.popust=false;

    this.service.GetEvent(this.id).subscribe(
      data=>{

          this.price=data.Price;        

      }
    )

    this.service.GetUserByUsername(this.userId).subscribe(
      data=>{

          this.noPoints=data.Points;        

      }
    )
  }

  onRegular()
  {     
      this.pointsTemp=this.noPoints;
      this.priceTemporal=this.price*this.reservationUserForm.value.noTickets;  

      this.pointsTemp=this.pointsTemp+(this.priceTemporal/1000)*133

      if(this.pointsTemp>3000 && this.pointsTemp<4000)
        {
          this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
        }
      else if(this.pointsTemp>4000)
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

     if(this.pointsTemp>3000 && this.pointsTemp<4000)
       {
         this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
       }
     else if(this.pointsTemp>4000)
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

     if(this.pointsTemp>3000 && this.pointsTemp<4000)
       {
         this.priceTemporal=this.priceTemporal-3*this.priceTemporal/100;
       }
     else if(this.pointsTemp>4000)
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
      this.noPoints=this.pointsTemp;
      
  }

}
