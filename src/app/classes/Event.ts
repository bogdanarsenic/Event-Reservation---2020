import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class Event{
    
    Id:string;
    Name:string;
    Type:string;
    Capacity:number;
    EventTime2:string;
    EventDay:string;
    Price:number;
    Status:string;
    LocationId:string;
    Longitude:number;
    Lattitude:number;
    Address:string;
    AllPictures:string[];
    UserId:string;
    SellerId:string;
    FrontPicture:string;
    Pictures:string;
    Place:string;
    EventTime:Date;
    IsActive:boolean;
    City:string;



    constructor(id:string,name:string,type:string,capacity:number,eventtime:string,eventday:string,price:number,status:string,place:string,locationId:string,lattitude:number,longitude:number,address:string,userId:string,sellerId:string,pictures:string,frontpicture:string)
    {
        this.Id=id;
        this.Name=name;
        this.Type=type;
        this.Capacity=capacity;
        this.EventTime2=eventtime;
        this.EventDay=eventday;
        this.Price=price;
        this.Status=status;
        this.LocationId=locationId;
        this.Lattitude=lattitude;
        this.Longitude=longitude;
        this.Address=address;
        this.UserId=userId;
        this.SellerId=sellerId;
        this.FrontPicture=frontpicture;
        this.Place=place;
        this.Pictures=pictures;
    }

}
