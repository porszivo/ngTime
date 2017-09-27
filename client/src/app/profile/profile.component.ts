import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = null;
  favTask: string = null;
  totalHoursWeek: number = 0;
  totalHoursMonth: number = 0;
  bla: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.initUserData();
  }

  initUserData() {
    this.userService.getUserData()
      .then(data => {
        this.username = data.name;
        data.task ? this.favTask = data.task : this.favTask = 'No Task yet';
        data.week ? this.totalHoursWeek = data.week : this.totalHoursWeek = 0;
        data.month ? this.totalHoursMonth = data.month : this.totalHoursMonth = 0;
      });
  }

}
