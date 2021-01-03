import { Component } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginView = true;
    errorMessage = '';
    errorState = false;

    formModel = new User();

    constructor(private accessService: AccessService,
                private alertService: AlertService,
                private router: Router,
                private activeRoute: ActivatedRoute) {
    }

    login(): void {
        console.log(this.formModel);
    }

    register(): void {
        this.accessService.registerUser(this.formModel).pipe(
            first()
        ).subscribe({
            next: ret => {
                console.log(ret);
                this.loginView = true;
                this.formModel = new User();
            },
            error: error => {
                this.alertService.error(error.error);
            }
        });
    }

}
