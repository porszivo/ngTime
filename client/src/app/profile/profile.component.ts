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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.initUserData();
  }

  initUserData() {
    this.userService.getUserData()
      .then(data => {
        this.username = data.name;
        this.favTask = data.task;
        this.totalHoursWeek = data.week;
        this.totalHoursMonth = data.month
      });
  }

}
