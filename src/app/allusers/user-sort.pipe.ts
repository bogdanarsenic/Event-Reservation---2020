import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/User';

@Pipe({
  name: 'userSort'
})
export class UserSortPipe implements PipeTransform {

  points:number[]
  transform(users:User[],Sort:string):User[]
  {
          if(Sort=="")
          {
              return users;
          }
          else         
          {
            if(Sort=="Name")
            {
              return users.sort((a, b) => a.Name.localeCompare(b.Name));
            }
            else if(Sort=="Surname")
            {
              return users.sort((a, b) => a.Surname.localeCompare(b.Surname));
            }
            else if(Sort=="Username")
            {
              return users.sort((a, b) => a.Username.localeCompare(b.Username));
            }

            else if(Sort=="Points")
            {
              var nesto=[]
              nesto= users.sort((a,b) => (a.Points > b.Points) ? 1 : ((b.Points > a.Points) ? -1 : 0));
              return nesto.reverse();
            }

            else if(Sort=="RevName")
            {
              var nesto=[]
              nesto=users.sort((a, b) => a.Name.localeCompare(b.Name));

              return nesto.reverse();
            }

            else if(Sort=="RevSurname")
            {
              var nesto=[]
              nesto=users.sort((a, b) => a.Surname.localeCompare(b.Surname));
              
              return nesto.reverse();
            }
            else if(Sort=="RevUsername")
            {
              var nesto=[]
              nesto=users.sort((a, b) => a.Username.localeCompare(b.Username));
              
              return nesto.reverse();
            }
            else
            {
              return users.sort((a,b) => (a.Points > b.Points) ? 1 : ((b.Points > a.Points) ? -1 : 0));
            }
           
          }


  }

}
