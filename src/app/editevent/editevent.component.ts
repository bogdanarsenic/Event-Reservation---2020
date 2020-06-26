import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../classes/Event';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  event:Event;
  eventUserForm:FormGroup;
  id:string;
  index:number;

  todayDate:Date = new Date();
  tomorrow:Date =  new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

  constructor(private editService:ServerService,private router:Router,private fb:FormBuilder) {
    this.createForm();
  }
 createForm()
   {
    this.eventUserForm=this.fb.group({

      Name: ['',Validators.required],
      Type: ['',Validators.required],
      Price:['',Validators.required],
      Capacity:['',Validators.required],
      EventDay:['',Validators.required],
      EventTime2:['00:00']
     })
   }

  ngOnInit() {
      this.id=sessionStorage.getItem('EventId');

      this.getEvent();
      
  }

  getEvent():any
  {
    this.editService.GetEvent(this.id).subscribe(
      data=>
      {
        this.event=data;
        this.eventUserForm.value.Name=this.event.Name;
        this.eventUserForm.value.Type=this.event.Type;
        this.eventUserForm.value.Price=this.event.Price;
        this.eventUserForm.value.Capacity=this.event.Capacity;
        this.eventUserForm.value.EventDay=this.event.EventDay;
        this.eventUserForm.value.EventTime2=this.event.EventTime2;

      }
    )
  }

  get f() { return this.eventUserForm.controls; }

  onSubmit()
  {
      this.Update(this.event)
  }


  Update(event:Event)
  {
    this.event.Name=this.eventUserForm.value.Name;
    this.event.Type=this.eventUserForm.value.Type;
    this.event.Price=this.eventUserForm.value.Price;
    this.event.Capacity=this.eventUserForm.value.Capacity;
    this.event.EventDay=this.eventUserForm.value.EventDay;
    this.event.EventTime2=this.eventUserForm.value.EventTime2;

   

    var u=this.event;
    u.Id=this.id;

   
    console.log(u);

    this.editService.PutEvent(u).subscribe(
      data=>{

                console.log('ok');
                this.router.navigate(['/allevents']);
                
            },
            error=>
            {
              console.log(u);
            }
          )
  }

}
