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
import { AgmCoreModule } from '@agm/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { MatCardModule } from "@angular/material/card";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AlleventsComponent } from './allevents/allevents.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { EditeventComponent } from './editevent/editevent.component';
import { AddticketComponent } from './addticket/addticket.component';
import { AllticketsComponent } from './alltickets/alltickets.component';
import { CommentsComponent } from './comments/comments.component';
import { UserFilterPipe } from './allusers/user-filter.pipe';
import { EventFilterPipe } from './allevents/event-filter.pipe';
import { TicketFilterPipe } from './alltickets/ticket-filter.pipe';
import { UserSortPipe } from './allusers/user-sort.pipe';
import { TicketSortPipe } from './alltickets/ticket-sort.pipe';
import { EventSortPipe } from './allevents/event-sort.pipe';





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
  { path: 'allevents',component:AlleventsComponent},
  { path: 'viewevent',component:ViewEventComponent},
  { path: 'editevent',component:EditeventComponent},
  { path: 'addticket',component:AddticketComponent},
  { path: 'alltickets',component:AllticketsComponent},
  { path: 'comments',component:CommentsComponent},



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
    UploadImageComponent,
    AlleventsComponent,
    ViewEventComponent,
    EditeventComponent,
    AddticketComponent,
    AllticketsComponent,
    CommentsComponent,
    UserFilterPipe,
    EventFilterPipe,
    TicketFilterPipe,
    UserSortPipe,
    TicketSortPipe,
    EventSortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyChbe6-AoArrpVJV6fV5CBC5wbyYlKhxa4'
    }),
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    MatCardModule,

  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
