import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../classes/Login';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { Location } from '../classes/Location';
import { Event } from '../classes/Event';
import { Ticket } from '../classes/Ticket';
import { Comment } from '../classes/Comment';


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

  
  blockUser(user:User):Observable<any>{

    return this.http.post("http://localhost:52294/api/User/BlockUser",user);
  }

  ApproveComment(comId:string):Observable<any>{

    return this.http.get(`http://localhost:52294/api/Comment/GetOneCommentApproved`,{params:{comId}});
  }

  DeleteUser(user:User):Observable<any>{

    return this.http.post("http://localhost:52294/api/User/DeleteUser",user);
  }

  DeleteTicket(ticket:Ticket):Observable<any>{

    return this.http.post("http://localhost:52294/api/Ticket/Delete",ticket);
  }

  DeleteEvent(event:Event):Observable<any>{

    return this.http.post("http://localhost:52294/api/Manifestation/Delete",event);
  }

  RegistrationSeller(seller:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/RegisterSeller",seller);
  }

  GetUser(Username:string,Password:string):Observable<User>
  {
      return this.http.get<User>(`http://localhost:52294/api/User/GetCurrent`,{params:{Username,Password}});
  }

  GetAllComments():Observable<any>
  {
    return this.http.get('http://localhost:52294/api/Comment/GetAllComments');
  }

  GetAllUsers():Observable<any>
  {
    return this.http.get('http://localhost:52294/api/User/GetAllUsers');
  }

  GetAllTickets():Observable<any>
  {
    return this.http.get('http://localhost:52294/api/Ticket/GetAllTickets');
  }

  GetAllReservedTicketsSeller(IdSeller:string):Observable<any>
  {
    return this.http.get(`http://localhost:52294/api/Ticket/GetAllReservedTicketsSeller`,{params:{IdSeller}});
  }


  GetAllReservedTicketsBuyer(name:string,surname:string):Observable<any>
  {
    return this.http.get(`http://localhost:52294/api/Ticket/GetAllReservedTicketsBuyer`,{params:{name,surname}});
  }


  GetAllEvents():Observable<any>
  {
    return this.http.get<any>("http://localhost:52294/api/Manifestation/GetAllManifestations");
  }

  GetEventbyUser(id:string):Observable<any>
  {
      return this.http.get<any>(`http://localhost:52294/api/Manifestation/GetAllManifestationsByUserId`,{params:{id}});
  }


  GetAllUsersWhoReserved():Observable<any>
  {
    return this.http.get("http://localhost:52294/api/User/GetAllUserTicket");
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

  postTicket(register:Ticket):Observable<any>{
    return this.http.post("http://localhost:52294/api/Ticket/RegisterTicket",register);
  }

  postComment(comment:Comment):Observable<any>{
    return this.http.post("http://localhost:52294/api/Comment/RegisterComment",comment);
  }

  AddingImage(fd:FormData):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/Upload", fd)
  }

  GetImage(idEvent:string,ImgName:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Manifestation/GetImage`,{params:{idEvent,ImgName}});
  }

  GetComment(Id:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Comment/GetAllByEventId`,{params:{Id}});
  }

  GetEvent(idEvent:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Manifestation/GetOneManifestation`,{params:{idEvent}});
  }

  GetTicketUserEvent(userId:string,idEvent:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Ticket/GetTicketUserEvent`,{params:{userId,idEvent}});
  }

  GetLongLat(id:string):Observable<any>
  {
    return this.http.get<any>(`http://localhost:52294/api/Location/GetOneLocation`,{params:{id}});
  }

  GetStatus(idEvent:string,status:string): Observable<any>{
    return this.http.get("http://localhost:52294/api/Manifestation/GetStatus",{params:{idEvent,status}});
  }

  PutSellerId(idEvent:string,idUser:string):Observable<any>{
    return this.http.get("http://localhost:52294/api/User/PutSellerId",{params:{idEvent,idUser}});
  }

  PutEvent(event:Event):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/Manifestation/Update", event);
  }

  ChangeUserStatus(user:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/UpdateTypePoints", user);
  }

  ChangeUserPointsQuits(user:User):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/User/UpdateUserPointsQuits", user);
  }

  ChangeTicketStatus(ticket:Ticket):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/Ticket/UpdateTicketStatus", ticket);
  }

  ChangeEventCapacity(event:Event):Observable<any>
  {
    return this.http.post("http://localhost:52294/api/Manifestation/UpdateCapacity", event);
  }

}
