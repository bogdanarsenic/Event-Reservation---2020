import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../classes/Ticket';

@Pipe({
  name: 'ticketFilter'
})
export class TicketFilterPipe implements PipeTransform {

  transform(tickets:Ticket[],Type:string, Status:string):Ticket[]
  {
          if(Status=="" && Type=="")
          {
              return tickets;
          }
          else if(Type!="")          
          {
            return tickets.filter(ticket=>ticket.Type.indexOf(Type)!==-1);
          }
          else
          return tickets.filter(ticket=>ticket.Status.indexOf(Status)!==-1);

  }

}
