import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trait } from '../../models/traits.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TraitsService {
  private name = '/traits';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTraits() {
    return this.http.get<Trait[]>(this.apiUrl + this.name);
  }
  getTraitById(id: string) {
    return this.http.get<Trait>(this.apiUrl + this.name + '/' + id);
  }

  addTrait(trait: Trait) {
    return this.http.post<Trait>(this.apiUrl + this.name, trait);
  }

  updateTrait(id: string, trait: Trait) {
    return this.http.patch<Trait>(this.apiUrl + this.name + '/' + id, trait);
  }
  deleteTrait(id: string) {
    return this.http.delete<Trait>(this.apiUrl + this.name + '/' + id);
  }
}
