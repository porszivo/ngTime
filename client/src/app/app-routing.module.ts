import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {TimesheetComponent} from "./timesheet/timesheet.component";
import {AccessService} from "./service/access.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'timesheet', component: TimesheetComponent, canActivate: [AccessService] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/timesheet', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
