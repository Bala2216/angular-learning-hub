import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { CombinedCard, Photo, User } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);

  searchUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(
      `https://jsonplaceholder.typicode.com/users?name_like=${term}`
    );
  }

  searchPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?_limit=50`
    );
  }

  searchCombined(term: string): Observable<CombinedCard[]> {
    return forkJoin({
      users: this.searchUsers(term),
      photos: this.searchPhotos(),
    }).pipe(
      map(({ users, photos }) =>
        users.map((user, i) => ({
          name: user.name,
          email: user.email,
          username: user.username,
          title: photos[i % photos.length]?.title || '',
          photoUrl: `https://picsum.photos/id/${user.id}/100/100` || '',
        }))
      )
    );
  }
}
