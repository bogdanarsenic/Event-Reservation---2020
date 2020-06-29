import { User } from './User'

export class Comment{
 
        Id:string 
        UserId:string
        Buyer:string
        ManifestationId:string
        Text:string
        Rating:Number
        User:User
        IsActive:boolean

        constructor(id:string,userId:string,rate:Number,text:string,eventId:string)
     {
        this.Id=id;
        this.UserId=userId;
        this.ManifestationId=eventId;
        this.Text=text;
        this.Rating=rate;

               
        }

        
}