import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { WeekbeanComponent } from './weekbean/weekbean.component';
import { TimetableComponent } from './timetable/timetable.component';
import {TimesheetbeanService} from "./service/timesheetbean.service";
import {HttpModule} from "@angular/http";
import {TaskService} from "./service/task.service";
import { FillPipe } from './fill.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    WeekbeanComponent,
    TimetableComponent,
    FillPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    TimesheetbeanService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
