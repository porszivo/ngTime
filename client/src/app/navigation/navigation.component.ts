import { Component, OnInit } from '@angular/core';
import {AccessService} from "../service/access.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private router: Router, private accessService: AccessService) { }

  ngOnInit() {
  }

  isLogin() {
    return this.router.url === '/login';
  }

  logout(): void {
    this.accessService.logoutUser();
    this.router.navigate(["/login"]);
  }

}
