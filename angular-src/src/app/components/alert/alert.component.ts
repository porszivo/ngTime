import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../model/Alert';
import { AlertType } from '../../model/AlertType';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    alerts: Alert[] = [];
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

    clearAlert(alert: Alert): void {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    getAlertType(alert: Alert): string {
        switch (alert.type) {
            case AlertType.ERROR:
                return 'alert-danger';
            case AlertType.INFO:
                return 'alert-info';
            case AlertType.WARNING:
                return 'alert-warning';
        }
    }
}
