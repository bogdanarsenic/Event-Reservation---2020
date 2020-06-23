import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../classes/Login';
import { Observable } from 'rxjs';
import { User } from '../classes/User';


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

  GetUserByUsername(Username:string):Observable<User>
  {
      return this.http.get<User>(`http://localhost:52294/api/User/GetCurrentByUsername`,{params:{Username}});
  }

  PutUser(user:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/Update", user);
  }
}
