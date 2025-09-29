import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private filterTextSubject = new BehaviorSubject<string>('');
  filterText$ = this.filterTextSubject.asObservable();

  constructor(private http: HttpClient) {}

  setFilterText(text: string) {
    this.filterTextSubject.next(text);
  }

  getCombinedData() {
    const users$ = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    const photos$ = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );

    return forkJoin([users$, photos$]).pipe(
      map(([users, photos]) =>
        users.map((user) => {
          const photo = photos.find((p) => p.id === user.id);
          return {
            name: user.name,
            email: user.email,
            city: user.address.city,
            title: photo?.title,
            photoUrl: photo?.thumbnailUrl || '',
          };
        })
      )
    );
  }
}
