import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Background } from '../../models/background.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private name = '/backgrounds';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRaces() {
    return this.http.get<Background>(this.apiUrl + this.name);
  }

  getRaceById(id: string) {
    return this.http.get<Background>(this.apiUrl + this.name + '/:' + id);
  }

  addRace(background: Background) {// todo change to dto
    return this.http.post<Background>(this.apiUrl + this.name, background);
  }

  updateRace(id: string, background: Background) { // todo change to dto
    return this.http.patch<Background>(this.apiUrl + this.name + '/:' + id, background);
  }
    
  deleteRace(id: string) {
    return this.http.delete<Background>(this.apiUrl + this.name + '/:' + id);
  }
}