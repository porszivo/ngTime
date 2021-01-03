import { Component } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private activeRouter: ActivatedRoute, private router: Router, private accessService: AccessService) {
  }

  isLogin() {
    return this.router.url === '/login';
  }

  logout(): void {
    this.accessService.logoutUser();
    this.router.navigate(['/login']);
  }

}
