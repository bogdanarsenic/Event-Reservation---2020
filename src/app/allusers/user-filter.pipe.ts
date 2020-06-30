import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/User';

@Pipe({
  name: 'userFilter',

})


export class UserFilterPipe implements PipeTransform{
  transform(users:User[],Role:string, Type:string):User[]
  {
          if(Role=="" && Type=="")
          {
              return users;
          }
          else if(Type!="")          
          {
            return users.filter(user=>user.Type.indexOf(Type)!==-1);
          }
          else
          return users.filter(user=>user.Role.indexOf(Role)!==-1);

  }

  
}

