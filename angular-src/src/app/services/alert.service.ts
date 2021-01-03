import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private subject = new Subject<string>();

    onAlert(): Observable<string> {
        return this.subject.asObservable();
    }

    error(message: string): void {
        this.subject.next(message);
    }

    clearAlert(): void {
        this.subject.next();
    }
}
