export class Register{
    
    Username:string;
    Password: string;
    Gender:string;
    Name:string;
    Lastname:string;

    constructor (username:string,password:string,name:string,lastname:string,gender:string)

    {
        this.Username=username;
        this.Password=password;
        this.Name=name;
        this.Lastname=lastname;
        this.Gender=gender;
    }
}