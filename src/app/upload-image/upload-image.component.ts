import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selected:File=null;
  id:string
  image:string
  pictures1:string[]
  pictures2:string[]
  pictures3:string[]
  temp:string
  local:string
  folder:string
  imageShow : any;



  constructor(private router:Router, private service:ServerService) { }

  ngOnInit() 
  {
    this.pictures3=[]
    this.isSeller();
    this.id=this.router.url.split('/')[1];
  }

  File(event)
  {
      this.selected=event.target.files[0];
      this.image=this.selected.name;

      let typeOfFile=this.selected.type.split('/');

    if (typeOfFile[0] == "image" && (typeOfFile[1] == "jpg" || typeOfFile[1] == "jpeg" || typeOfFile[1] == "png") && this.selected.size < 512000)
        { 
          this.image=this.selected.name;
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
          this.imageShow = (<FileReader>event.target).result;
        }
      }
      else
      {
        alert("Invalid! Valid formats - jpg,jpeg,png with size lower than 512kb");
        return;
      }

  }

  UploadFile()
  {
      const fd=new FormData();
      fd.append('image',this.selected,this.selected.name)

      this.service.AddingImage(fd).subscribe(
        data=>
        {
            console.log(data);
        }
      );

      this.service.GetImage(this.id,this.image).subscribe(
        data=>
        {

        }
      );
      
  }

  OnSubmit()
  {

    this.pictures3.push(this.imageShow);
    // this.local="http://localhost:52294/";
    // this.folder="Content/images/";

    // this.service.GetEvent(this.id).subscribe(
    //   data=>{
    //     data.Pictures=data.Pictures.replace(/\\/g,"/");
    //     this.pictures1=data.Pictures.split(';');
    //     this.pictures1.forEach(element=>
    //       {
    //         this.pictures2=element.split('/');
    //         this.temp=this.local+this.folder+this.pictures2[this.pictures2.length-1];
    //         this.pictures3.push(this.temp);
    //       });
    //   }
    // )
    
  }

  OnFinish()
  {
    this.router.navigateByUrl('/home');
  }

  isSeller()
  {
    if(localStorage.getItem('Role')=='Seller')
    {
        return true;
    }
      return this.router.navigateByUrl("/home");
  }

}
