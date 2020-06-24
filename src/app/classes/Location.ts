export class Location{
    
    Id:string;
    Lattitude:number;
    Longitude:number;
    Address:string;

    constructor(lattitude:number,longitude:number,address:string)
    {
        this.Lattitude=lattitude;
        this.Longitude=longitude;
        this.Address=address;
    }

}