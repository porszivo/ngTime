import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../model/Alert';
import { AlertType } from '../model/AlertType';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private subject = new Subject<Alert>();

    onAlert(): Observable<Alert> {
        return this.subject.asObservable();
    }

    error(message: string): void {
        this.subject.next({message, type: AlertType.ERROR});
    }

    info(message: string): void {
        this.subject.next({message, type: AlertType.INFO});
    }

    clearAlert(): void {
        this.subject.next();
    }
}
