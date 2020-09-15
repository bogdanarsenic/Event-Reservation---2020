import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { Ticket } from '../classes/Ticket';
import { Comment } from '../classes/Comment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {


    commentUserForm:FormGroup;
    idEvent:string
    userId:string
    allComments:Comment[]
    approvedComment:Comment
    Approve:boolean
    ticket:Ticket
    CanWrite:boolean
    buyer:string

    rate:number
    noCom:number
    datePipe = new DatePipe('en-US');

    todayDate=Date.now();

    today = this.datePipe.transform(this.todayDate, 'MM/dd/yyyy HH:mm:ss');

    empty:boolean
  
    comment:Comment
    constructor(private router:Router,private server:ServerService,private fb:FormBuilder)
     {
      this.createForm();
     }
  
     createForm()
     {
       this.commentUserForm=this.fb.group({
  
        Text: ['',Validators.required],
        Rate:[,Validators.required]
        
       })
      }
  
    ngOnInit() {
  
      this.rate=0;
      this.noCom=0;
      this.Approve=false;
      this.allComments=[]
      this.ticket
      this.empty=false;
      this.CanWrite=false;
      this.comment=new Comment("","",0,"","");
      this.idEvent=localStorage.getItem('EventId');
      this.userId=localStorage.getItem('Username');  
  
      if(this.IsSeller() || this.IsAdmin())
      {
        this.server.GetComment(this.idEvent).subscribe(
          data=>
          {
            this.allComments=data; 
            this.noCom=this.allComments.length; 

            if(this.noCom!=0)
            {  
              
              {
              data.forEach(x=>
                {
                  this.rate=this.rate+x.Rating;
                })
              this.rate=this.rate/this.noCom;
              this.rate=(Number)(this.rate.toFixed(2));
              }   
           }
          else
                  {
                    alert("There is no comments for this event");
                  }    
          }
        )
      }
    else
        {
  
  
        this.server.GetComment(this.idEvent).subscribe(
                data=>
                {
                  this.noCom=data.length;
                  
                  if(this.noCom!=0)
                  {
                      data.forEach(
                        element=>
                        {
                           this.rate=this.rate+element.Rating;
 
                          
                            if(element.IsActive==true)
                            {
                              this.approvedComment=element;
                              this.allComments.push(this.approvedComment);
                            }
                       
                        }
                      )
                    this.rate=this.rate/this.noCom;
                    this.rate=(Number)(this.rate.toFixed(2));
                  }
                  else
                  {
                    alert("There is no comments for this event");
                  }
                }
              )
          
        if(this.IsBuyer())
          {

              this.server.GetUserByUsername(this.userId).subscribe(
                data=>
                {
                    this.buyer=data.Name+" "+data.Surname;
                    this.getTicket();
                }
              )      
            }            
          }
          
      
    }

    getTicket()
    {
      
      this.server.GetTicketUserEvent(this.buyer,this.idEvent).subscribe(
        data=>
        {
          if(data!=null)
          {
            this.ticket=data;
            let eventTime=new Date(this.ticket.EventTime);
            let todayTime=new Date(this.today);

            if(eventTime<todayTime && this.ticket.Status=="Reserved")
            {
                this.CanWrite=true;
            }
          }

        }
      )
    }

    
    ApproveNow(comId:string)
    {

        this.server.ApproveComment(comId).subscribe(
          data=>
          {
            this.router.navigate(['/comments']).then(()=>window.location.reload());
          }
        )
    }
   
  
    onSubmit()
    {
        this.comment.Rating=this.commentUserForm.value.Rate;
        this.comment.Text=this.commentUserForm.value.Text;
        this.comment.ManifestationId=this.idEvent;
        this.comment.IsActive=false;
        this.comment.UserId=this.userId;

        this.server.postComment(this.comment).subscribe(
          data=>
          {
            this.router.navigate(['/home']).then(()=>window.location.reload());
          })
    }
  
    IsBuyer()
    {
      if(localStorage.getItem('Role')=="Buyer")
      {
        return true;
      }
      return false;
    }

    IsAdmin()
    {
      if(localStorage.getItem('Role')=="Admin")
      {
          return true;
      }
      return false;
    }
    IsSeller()
    {
      if(localStorage.getItem('Role')=="Seller")
      {
        return true;
      }
      return false;
    }
}
