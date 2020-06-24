import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class Event{
    
    Id:string;
    Name:string;
    Type:string;
    Capacity:number;
    EventTime:string;
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



    constructor(id:string,name:string,type:string,capacity:number,eventtime:string,price:number,status:string,locationId:string,lattitude:number,longitude:number,address:string,userId:string,sellerId:string,frontpicture:string)
    {
        this.Id=id;
        this.Name=name;
        this.Type=type;
        this.Capacity=capacity;
        this.EventTime=eventtime;
        this.Price=price;
        this.Status=status;
        this.LocationId=locationId;
        this.Lattitude=lattitude;
        this.Longitude=longitude;
        this.Address=address;
        this.UserId=userId;
        this.SellerId=sellerId;
        this.FrontPicture=frontpicture;
    }

}
