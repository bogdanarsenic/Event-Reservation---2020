import { User } from './User'

export class Comment{
 
        Id:String 
        UserId:String
        Buyer:String
        ManifestationId:String
        Text:String
        Rating:Number
        User:User
        IsActive:boolean

        constructor(id:string,userId:string,rate:Number,text:String,eventId:string)
     {
        this.Id=id;
        this.UserId=userId;
        this.ManifestationId=eventId;
        this.Text=text;
        this.Rating=rate;

               
        }

        
}