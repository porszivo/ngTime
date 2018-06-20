import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {TimesheetComponent} from "./timesheet/timesheet.component";
import {AccessService} from "./service/access.service";
import {UserPanelComponent} from "./user-panel/user-panel.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'timesheet', component: TimesheetComponent, canActivate: [AccessService]},
  { path: 'usercp', component: UserPanelComponent, canActivate: [AccessService]},
  /** No Children needed currently **/
  /*  children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', component: TimetableComponent, pathMatch: 'full' }
    ]
  },*/
  { path: '**', redirectTo: '/timesheet', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}