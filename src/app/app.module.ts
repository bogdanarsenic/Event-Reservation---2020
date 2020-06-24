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

const appRoutes:Routes=[
  { path: 'registration',component:RegisterComponent},
  { path: '', component:HomeComponent},
  { path: 'home', component:HomeComponent},
  { path: 'login',component:LoginComponent},
  { path: 'editprofile',component:EditprofileComponent},
  { path: 'addseller',component:AddsellerComponent},
  { path: 'allusers',component:AllusersComponent},
  { path: 'addevent',component:AddeventComponent},




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
    AddeventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
