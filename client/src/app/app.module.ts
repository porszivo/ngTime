import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { WeekbeanComponent } from './weekbean/weekbean.component';
import { TimetableComponent } from './timetable/timetable.component';
import {TimesheetbeanService} from './service/timesheetbean.service';
import {HttpModule} from '@angular/http';
import {TaskService} from './service/task.service';
import { FillPipe } from './fill.pipe';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { TimesheetComponent } from './timesheet/timesheet.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccessService} from './service/access.service';
import {CustomFormsModule} from "ng2-validation";
import { ProfileComponent } from './profile/profile.component';
import {UserService} from "./service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    WeekbeanComponent,
    TimetableComponent,
    FillPipe,
    LoginComponent,
    TimesheetComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule
  ],
  providers: [
    TimesheetbeanService,
    TaskService,
    AccessService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
