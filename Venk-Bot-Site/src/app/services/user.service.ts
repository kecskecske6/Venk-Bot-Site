import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../classes/user-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.backend}/auth`, { withCredentials: true });
  }

  logOut(): Observable<void> {
    return this.http.post<void>(`${environment.backend}/auth/logout`, {}, { withCredentials: true });
  }

}
