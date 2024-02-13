import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModModel } from '../classes/mod-model';

@Injectable({
  providedIn: 'root'
})
export class ModService {

  constructor(private http: HttpClient) { }

  uploadFile(mod: ModModel, file: File): Observable<any> {
    var formData: FormData = new FormData();
    formData.append('authorId', mod.authorId.toString());
    formData.append('description', mod.description);
    formData.append('gameId', mod.gameId.toString());
    formData.append('name', mod.name);
    formData.append('uploadDate', mod.uploadDate.toISOString());
    formData.append('file', file);
    return this.http.post<any>(`${environment.backend}/mod`, formData);
  }

  getAll(): Observable<ModModel[]> {
    return this.http.get<ModModel[]>(`${environment.backend}/mod`);
  }

}
