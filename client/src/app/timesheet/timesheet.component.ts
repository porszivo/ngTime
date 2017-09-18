import { Component, OnInit } from '@angular/core';
import {AccessService} from "../service/access.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private router: Router, private accessService: AccessService) { }

  ngOnInit() {
  }

  logout() {
    this.accessService.logoutUser();
    this.router.navigate(['/login']);
    console.log(localStorage);
  }

}
