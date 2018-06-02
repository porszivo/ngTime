import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeekbeanComponent } from './weekbean/weekbean.component';
import { TimetableComponent } from './timetable/timetable.component';
import {TimesheetbeanService} from './service/timesheetbean.service';
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
import { TaskComponent } from './task/task.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeekbeanComponent,
    TimetableComponent,
    FillPipe,
    LoginComponent,
    TimesheetComponent,
    ProfileComponent,
    TaskComponent,
    UserPanelComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
