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

  getAllBackgrounds() {
    return this.http.get<Background[]>(this.apiUrl + this.name);
  }

  getBackgroundById(id: string) {
    return this.http.get<Background>(this.apiUrl + this.name + '/' + id);
  }

  addBackground(background: Background) {// todo change to dto
    return this.http.post<any>(this.apiUrl + this.name, background);
  }

  updateBackground(id: string, background: Background) { // todo change to dto
    return this.http.patch<any>(this.apiUrl + this.name + '/' + id, background);
  }
    
  deleteBackground(id: string) {
    return this.http.delete<any>(this.apiUrl + this.name + '/' + id);
  }
}