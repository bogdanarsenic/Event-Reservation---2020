import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../classes/Ticket';

@Pipe({
  name: 'ticketSort'
})
export class TicketSortPipe implements PipeTransform {

  transform(tickets:Ticket[],Sort:string):Ticket[]
  {
          if(Sort=="")
          {
              return tickets;
          }
          else         
          {
            if(Sort=="Name")
            {
              return tickets.sort((a, b) => a.Name.localeCompare(b.Name));
            }
            else if(Sort=="Price")
            {
              var nesto=[]
              nesto= tickets.sort((a,b) => (a.Price > b.Price) ? 1 : ((b.Price > a.Price) ? -1 : 0));
              return nesto.reverse();
            }

            else if(Sort=="Date")
            {
              return tickets.sort((a,b) => (a.EventTime > b.EventTime) ? 1 : ((b.EventTime > a.EventTime) ? -1 : 0));
            }

            else if(Sort=="RevPrice")
            {
              return tickets.sort((a,b) => (a.Price > b.Price) ? 1 : ((b.Price > a.Price) ? -1 : 0));
            }

            else if(Sort=="RevName")
            {
              var nesto=[]
              nesto=tickets.sort((a, b) => a.Name.localeCompare(b.Name));

              return nesto.reverse();
            }

            else (Sort=="RevDate")
            {
              var nesto=[]
              nesto= tickets.sort((a,b) => (new Date(a.EventTime) > new Date(b.EventTime)) ? 1 : ((new Date(b.EventTime) > new Date(a.EventTime)) ? -1 : 0));
              return nesto.reverse();
            }
           
          }


  }

}
