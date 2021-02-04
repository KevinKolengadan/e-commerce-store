import { UpdateUserModel, User} from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    })
  };
  getUser(userId: number): Observable<User> {
    return this.http
      .get<User>('https://fakestoreapi.com/users/' + userId, this.httpOptions);
  }

  updateUser(userId: number, user: UpdateUserModel): Observable<User> {
     return this.http.put<User>('https://fakestoreapi.com/users/' + userId, user, this.httpOptions);
  }
}
