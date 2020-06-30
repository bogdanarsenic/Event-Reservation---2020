import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormBuilder } from '@angular/forms';
import { Ticket } from '../classes/Ticket';
import { DatePipe } from '@angular/common';
import { User } from '../classes/User';

@Component({
  selector: 'app-alltickets',
  templateUrl: './alltickets.component.html',
  styleUrls: ['./alltickets.component.css']
})
export class AllticketsComponent implements OnInit {


  tickets:Ticket[]
  userId:string

  buyerName:string
  buyerSurname:string

  sellerTickets:Ticket[]

  datePipe = new DatePipe('en-US');

  Type:string
  Status:string
  todayDate=Date.now();

  user:User

  Sort:string

  today = this.datePipe.transform(this.todayDate, 'MM/dd/yyyy HH:mm:ss');

  constructor(private router:Router,private service:ServerService,private fb:FormBuilder) {
    
    this.createForm();
  }

  createForm()
   {
   }
 
  ngOnInit()
   {

      this.Type=""
      this.Status=""
      this.Sort=""
      this.tickets=[]
      this.sellerTickets=[]

      if(this.isAdmin())
      {
        this.service.GetAllTickets().subscribe(
          data=>{

                if(data.length!=0)
                {
                  this.tickets=data;
                  data.forEach(x=>
                    {
                      this.changeManifestationId(x);
                    })
                  
                }
               else
               {
                 alert("There is no tickets");
               }

          }
        )
      }   

      if(this.isSeller())
     {
        this.userId=sessionStorage.getItem('Username');
        this.service. GetAllReservedTicketsSeller(this.userId).subscribe(
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
                    if(x.IsActive==true)
                    {
                       this.tickets.push(x);
                       this.changeManifestationId(x);
                    }
                  }
                )
                


              }
          }
        )
     }

     if(this.isBuyer())
     {
      this.userId=sessionStorage.getItem('Username');

      this.service.GetUserByUsername(this.userId).subscribe(
        data=>
        {
            this.buyerName=data.Name;
            this.buyerSurname=data.Surname;
            this.user=data;
            this.getAllReservedTicketsBuyer(this.buyerName,this.buyerSurname);

        }
      )


     }

     
  }

  getAllReservedTicketsBuyer(name:string,surname:string)
  {
    this.service. GetAllReservedTicketsBuyer(this.buyerName,this.buyerSurname).subscribe(
      data=>
      {
          if(data.length==0)
          {
            alert("You haven't bought any ticket")
          }
          else
          {
            data.forEach(
              x=>{
                if(x.IsActive==true)
                {
                   this.tickets.push(x);
                   this.changeManifestationId(x);
                }
              }
            )

          }
      }
    )
  }

  changeManifestationId(ticket:Ticket)
  {
   
    ticket.EventTime=ticket.EventTime.replace('T'," ");
   this.service.GetEvent(ticket.ManifestationId).subscribe(
            data2=>
            {
                ticket.Name=data2.Name;
            }
          )
   }
  
 checkWithdrawButton(ticket:Ticket)
 {
   
    let eventTime=new Date(ticket.EventTime);
    eventTime=new Date(eventTime.setDate(eventTime.getDate()-7))

    let todayTime=new Date(this.today);

      if(todayTime<=eventTime)
      {
          return true;
      }
      else
      {
          return false;         
      }

 }

 Delete(ticket:Ticket)
 {
   this.service.DeleteTicket(ticket)
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

 onWithdraw(ticket:Ticket)
 {
    this.user.Points=this.user.Points-ticket.Price/1000*133*4;
    
    this.user.NoQuit=this.user.NoQuit+1;


    ticket.Status="Withdrawed";


    this.service.ChangeTicketStatus(ticket).subscribe(
      data=>
      {

      }
    )

    this.service.ChangeUserPointsQuits(this.user).subscribe(
      data=>
      {

      }
    )
 }

  isAdmin()
  {
    if(sessionStorage.getItem('Role')=="Admin")
    return true;
    else 
    return false;
  }

  isBuyer()
  {
    if(sessionStorage.getItem('Role')=="Buyer")
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

}
