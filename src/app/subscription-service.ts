import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeData } from './employee';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  // internal state (array of subscriptions)
  private subscriptionsSubject = new BehaviorSubject<EmployeeData[]>([]);

  // public observable to subscribe to
  subscriptions$ = this.subscriptionsSubject.asObservable();
  constructor() {}

  // add new item
  add(subscription: EmployeeData) {
    const current = this.subscriptionsSubject.value;
    this.subscriptionsSubject.next([...current, subscription]); // append
  }
}
