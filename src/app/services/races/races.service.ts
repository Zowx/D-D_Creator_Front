import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Race } from '../../models/race.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private name = '/races';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRaces() {
    return this.http.get<Race[]>(this.apiUrl + this.name);
  }

  getRaceById(id: string) {
    return this.http.get<Race>(this.apiUrl + this.name + '/' + id);
  }

  addRace(race: Race) {
    return this.http.post<any>(this.apiUrl + this.name, race);
  }

  updateRace(id: string, race: Race) {
    return this.http.patch<any>(this.apiUrl + this.name + '/' + id, race);
  }
  deleteRace(id: string) {
    return this.http.delete<any>(this.apiUrl + this.name + '/' + id);
  }
}
