import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerService } from './services/server.service';
import { HttpClientModule } from '@angular/common/http';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AddsellerComponent } from './addseller/addseller.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AddeventComponent } from './addevent/addevent.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';





const appRoutes:Routes=[
  { path: 'registration',component:RegisterComponent},
  { path: '', component:HomeComponent},
  { path: 'home', component:HomeComponent},
  { path: 'login',component:LoginComponent},
  { path: 'editprofile',component:EditprofileComponent},
  { path: 'addseller',component:AddsellerComponent},
  { path: 'allusers',component:AllusersComponent},
  { path: 'addevent',component:AddeventComponent},
  { path: ':eventId/upload',component:UploadImageComponent},



];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditprofileComponent,
    AddsellerComponent,
    AllusersComponent,
    AddeventComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyChbe6-AoArrpVJV6fV5CBC5wbyYlKhxa4'
    }),
    GoogleMapsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    MatMomentDateModule, 

  ],
  providers: [ServerService,{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: 'sr-SR'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
