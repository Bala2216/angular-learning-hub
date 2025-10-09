import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Record {
  id: number;
  name: string;
  age: number;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private data: Record[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 30),
    email: `user${i + 1}@example.com`,
  }));

  private records$ = new BehaviorSubject<Record[]>(this.data);

  getRecords() {
    return this.records$.asObservable();
  }

  updateRecord(updated: Record) {
    this.data = this.data.map((r) => (r.id === updated.id ? updated : r));
    this.records$.next(this.data);
  }

  addRecord(newRecord: Record) {
    newRecord.id = this.data.length + 1;
    this.data.push(newRecord);
    this.records$.next(this.data);
  }
}
