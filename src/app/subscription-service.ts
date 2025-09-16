import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeData } from './employee';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  // internal state (array of subscriptions)
  private subscriptionsSubject = new BehaviorSubject<EmployeeData[]>([]);

  private subscriptionsSearchString = new BehaviorSubject<string>("");

  private subscriptionsGenderSelection = new BehaviorSubject<string>("");

  // public observable to subscribe to
  subscriptions$ = this.subscriptionsSubject.asObservable();
  subscriptionsSearchStr$ = this.subscriptionsSearchString.asObservable();
  subscriptionsGenderSelection$ = this.subscriptionsGenderSelection.asObservable();

  constructor() {}

  // add new item
  add(subscription: EmployeeData) {
    const current = this.subscriptionsSubject.value;
    this.subscriptionsSubject.next([...current, subscription]); // append
  }

  setString(str: string) {
    this.subscriptionsSearchString.next(str);
  }

  setGenderSelection(str: string) {
    this.subscriptionsGenderSelection.next(str);
  }
}
