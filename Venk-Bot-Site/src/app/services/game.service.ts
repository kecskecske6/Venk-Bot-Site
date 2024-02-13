import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../classes/game-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(`${environment.backend}/game`);
  }

}
