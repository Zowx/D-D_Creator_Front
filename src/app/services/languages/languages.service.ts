import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../../models/language.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private name = '/languages';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRaces() {
    return this.http.get<Language>(this.apiUrl + this.name);
  }

  getRaceById(id: string) {
    return this.http.get<Language>(this.apiUrl + this.name + '/:' + id);
  }

  addRace(language: Language) {
    return this.http.post<Language>(this.apiUrl + this.name, language);
  }

  updateRace(id: string, language: Language) {
    return this.http.patch<Language>(this.apiUrl + this.name + '/:' + id, language);
  }
  deleteRace(id: string) {
    return this.http.delete<Language>(this.apiUrl + this.name + '/:' + id);
  }
}