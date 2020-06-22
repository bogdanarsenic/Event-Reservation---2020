export class User{
    Id:string;
    Username:string;
    Password:string;
    Name:string;
    Surname:string;
    Gender:string;
    Role:string;
    IsActive:boolean;
    
    constructor(id:string,username:string ,password:string, name:string, surname:string, gender:string, role:string)
    {
        this.Id=id;
        this.Username=username;
        this.Password=password;
        this.Name=name;
        this.Surname=surname;
        this.Gender=gender;
        this.Role=role;

    }
}