import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RegisterResponseDTO } from '../classes/DTOs/register-response-dto';
import { RegisterDTO } from '../classes/DTOs/register-dto';
import { LoginDTO } from '../classes/DTOs/login-dto';
import { LoginResponseDTO } from '../classes/DTOs/login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: RegisterDTO): Observable<RegisterResponseDTO> {
    return this.http.post<RegisterResponseDTO>(`${environment.backend}/user/register`, user);
  }

  validate(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.backend}/user/validate/${token}`);
  }

  login(user: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${environment.backend}/user/login`, user);
  }

  getUser(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.backend}/user`);
  }

}
