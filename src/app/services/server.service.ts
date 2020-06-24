import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../classes/Login';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { Location } from '../classes/Location';
import { Event } from '../classes/Event';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http:HttpClient) { }

  ngOnInit()
  {

  }

  RegistrationBuyer(buyer:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/Register",buyer);
  }

  RegistrationSeller(seller:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/RegisterSeller",seller);
  }

  GetUser(Username:string,Password:string):Observable<User>
  {
      return this.http.get<User>(`http://localhost:52294/api/User/GetCurrent`,{params:{Username,Password}});
  }

  GetAllUsers():Observable<any>
  {
    return this.http.get('http://localhost:52294/api/User/GetAllUsers');
  }

  GetAllTicketsByUserId(idSeller:string):Observable<any>
  {
    return this.http.get('http://localhost:52294/api/Ticket/GetAllTicketsUser',{params:{idSeller}});
  }


  GetUserByUsername(Username:string):Observable<User>
  {
      return this.http.get<User>(`http://localhost:52294/api/User/GetCurrentByUsername`,{params:{Username}});
  }

  PutUser(user:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/Update", user);
  }

  postLocation(location:Location):Observable<any>{
    return this.http.post("http://localhost:52294/api/Location/RegisterLocation",location);
  }

  postEvent(register:Event):Observable<any>{
    return this.http.post("http://localhost:52294/api/Manifestation/RegisterManifestation",register);
  }

  AddingImage(fd:FormData):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/Upload", fd)
  }

  GetImage(idEvent:string,ImgName:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Manifestation/GetImage`,{params:{idEvent,ImgName}});
  }

  GetEvent(idEvent:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Manifestation/GetOneManifestation`,{params:{idEvent}});
  }
}
