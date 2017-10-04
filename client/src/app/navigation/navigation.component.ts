import { Component, OnInit } from '@angular/core';
import {AccessService} from "../service/access.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private accessService: AccessService) { }

  ngOnInit() {
  }

  logout(): void {
    this.accessService.logoutUser();
    this.router.navigate(["/login"]);
  }

}
