export class User{
    
    Username:string;
    Password:string;
    Name:string;
    Surname:string;
    Gender:string;
    Role:string;
    IsActive:boolean;
    Points:number;
    Type:string;
    ManifestationId:string;
    TicketId:string;
    NoQuit:number;
    IsBlocked:boolean;
    
    constructor(username:string ,password:string, name:string, surname:string, gender:string, role:string, type:string,points:number)
    {
        this.Username=username;
        this.Password=password;
        this.Name=name;
        this.Surname=surname;
        this.Gender=gender;
        this.Role=role;
        this.Type=type;
        this.Points=points;       
        
    }
}