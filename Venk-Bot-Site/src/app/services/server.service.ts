import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerModel } from '../classes/server-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getServer(id: string): Observable<ServerModel> {
    return this.http.get<ServerModel>(`${environment.backend}/server/${id}`);
  }

  saveServer(id: string, server: ServerModel): Observable<boolean> {
    return this.http.post<boolean>(`${environment.backend}/server/${id}`, server);
  }

}
