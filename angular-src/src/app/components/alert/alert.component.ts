import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    alerts: string[] = [];
    private alertSubscription: Subscription;

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.alertSubscription = this.alertService.onAlert()
            .subscribe(alert => {
                    if (!this.alerts.includes(alert)) {
                        this.alerts.push(alert);
                    }
                }
            );
    }

    clearAlert(alert: string): void {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

}
