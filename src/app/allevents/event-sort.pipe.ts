import { Pipe, PipeTransform } from '@angular/core';

import {Event} from '../classes/Event';

@Pipe({
  name: 'eventSort'
})
export class EventSortPipe implements PipeTransform {

  transform(events:Event[],Sort:string):Event[]
  {
          if(Sort=="")
          {
              return events;
          }
          else         
          {
            if(Sort=="Name")
            {
              return events.sort((a, b) => a.Name.localeCompare(b.Name));
            }

            else if(Sort=="Date")
            {
              return events.sort((a,b) => (a.EventTime > b.EventTime) ? 1 : ((b.EventTime > a.EventTime) ? -1 : 0));
            }

            else if(Sort=="Price")
            {
              var nesto=[]
              nesto= events.sort((a,b) => (a.Price > b.Price) ? 1 : ((b.Price > a.Price) ? -1 : 0));
              return nesto.reverse();
            }

            else if(Sort=="Place")
            {
              return events.sort((a, b) => a.City.localeCompare(b.City));
            }   

            else if(Sort=="RevName")
            {
              var nesto=[]
              nesto=events.sort((a, b) => a.Name.localeCompare(b.Name));

              return nesto.reverse();
            }

            else if(Sort=="RevPrice")
            {
              return events.sort((a,b) => (a.Price > b.Price) ? 1 : ((b.Price > a.Price) ? -1 : 0));
            }
            
            else if(Sort=="RevPlace")
            {
              var nesto=[]
              nesto=events.sort((a, b) => a.City.localeCompare(b.City));

              return nesto.reverse();
            }
            else (Sort=="RevDate")
            {
              var nesto=[]
              nesto= events.sort((a,b) => (new Date(a.EventTime) > new Date(b.EventTime)) ? 1 : ((new Date(b.EventTime) > new Date(a.EventTime)) ? -1 : 0));
              return nesto.reverse();
            }
           
          }


  }

}
