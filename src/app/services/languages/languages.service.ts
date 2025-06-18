import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../../models/language.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private name = '/languages';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getLanguages() {
    return this.http.get<Language[]>(this.apiUrl + this.name);
  }
  getLanguageById(id: string) {
    return this.http.get<Language>(this.apiUrl + this.name + '/' + id);
  }

  addLanguage(language: Language) {
    return this.http.post<Language>(this.apiUrl + this.name, language);
  }

  updateLanguage(id: string, language: Language) {
    return this.http.patch<Language>(this.apiUrl + this.name + '/' + id, language);
  }
  deleteLanguage(id: string) {
    return this.http.delete<Language>(this.apiUrl + this.name + '/' + id);
  }
}