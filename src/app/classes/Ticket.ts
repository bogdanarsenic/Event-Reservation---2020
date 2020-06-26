import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class Ticket{
    
    Id:string;
    ManifestationId:string;
    EventTime:string;
    Price:number;
    Buyer:string
    Status:string;
    Type:string;



    constructor(id:string,manifestationId:string,eventtime:string,price:number,buyer:string,status:string,type:string)
    {
        this.Id=id;
        this.ManifestationId=manifestationId;
        this.EventTime=eventtime;
        this.Price=price;
        this.Buyer=buyer;
        this.Status=status;
        this.Type=type;
    }

}


