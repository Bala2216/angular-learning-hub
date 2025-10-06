import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export interface Photo {
  id: number;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos?_limit=20'
    );
  }
}
