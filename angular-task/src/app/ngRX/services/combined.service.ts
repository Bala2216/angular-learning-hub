import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CombinedCard } from '../models/combined-card.model';

@Injectable({ providedIn: 'root' })

export class CombinedService {
  constructor(private http: HttpClient) {}

  getCombinedData(term: string): Observable<CombinedCard[]> {
    const users$ = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    const photos$ = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/photos?_limit=10'
    );

    return forkJoin([users$, photos$]).pipe(
      map(([users, photos]) =>
        users
          .filter(
            (user) =>
              user.name.toLowerCase().includes(term.toLowerCase()) ||
              user.username.toLowerCase().includes(term.toLowerCase())
          )
          .map((user, i) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            photoUrl: photos[i]?.thumbnailUrl || '',
          }))
      )
    );
  }
}
