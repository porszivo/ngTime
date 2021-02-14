import { Component } from '@angular/core';
import { AccessService } from './services/access.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public constructor(private accessService: AccessService,
                       private breakpointObserver: BreakpointObserver,
                       private router: Router,
                       private alertService: AlertService) {
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    pause = true;

    isLogin(): boolean {
        return this.router.url === '/login';
    }

    logout(): void {
        this.accessService.logoutUser();
        this.alertService.info('Ausgeloggt');
        this.router.navigate(['/login']);
    }

}
