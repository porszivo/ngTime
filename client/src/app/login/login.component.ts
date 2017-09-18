import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccessService} from '../service/access.service';
import {Router} from '@angular/router';

// TODO: Animate change of register and login view

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginView = true;
  errorMessage = '';
  errorState = false;

  constructor(private accessService: AccessService, private router: Router) {}

  onSubmit(form: NgForm) {

    /* Form is register form if key email exists */
    if ('email' in form.value) {
      if (!form.value['email'] || !form.value['username'] || !form.value['password']) {
        this.errorState = true;
        this.errorMessage = 'All fields are mandatory';
      } else {
      }
    } else {
      if (!form.value['username'] || !form.value['password']) {
        this.errorState = true;
        this.errorMessage = 'Username or Password is missing!';
      } else {
        this.accessService.loginUser(form.value['username'], form.value['password'])
          .then(success => {
            if (success) this.router.navigate(['timesheet']);
            this.errorState = !success;
            this.errorMessage = "Username or Password is wrong!";
          });
      }
    }
  }

}
