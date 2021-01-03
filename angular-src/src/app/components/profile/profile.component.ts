import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = null;
  favTask: string = null;
  totalHoursWeek = 0;
  totalHoursMonth = 0;
  bla = false;

  constructor(private userService: UserService) {
  }

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
