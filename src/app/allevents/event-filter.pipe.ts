import { Pipe, PipeTransform } from '@angular/core';
import {Event } from '../classes/Event';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(events:Event[],Type:string):Event[]
  {
          if(Type=="")
          {
              return events;
          }
          else
          return events.filter(e=>e.Type.indexOf(Type)!==-1);

  }

}
