export class Location{
    
    Id:string;
    Lattitude:number;
    Longitude:number;
    Address:string;

    constructor(id:string,lattitude:number,longitude:number,address:string)
    {
        this.Id=id;
        this.Lattitude=lattitude;
        this.Longitude=longitude;
        this.Address=address;
    }

}