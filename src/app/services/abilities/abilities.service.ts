import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ability } from '../../models/ability.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AbilitiesService {
  private name = '/abilities';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAbilities() {
    return this.http.get<Ability[]>(this.apiUrl + this.name);
  }

  getAbilityById(id: string) {
    return this.http.get<Ability>(this.apiUrl + this.name + '/:' + id);
  }

  addAbility(abilities: Ability) {// todo change to dto
    return this.http.post<Ability>(this.apiUrl + this.name, abilities);
  }

  updateAbility(id: string, abilities: Ability) { // todo change to dto
    return this.http.patch<Ability>(this.apiUrl + this.name + '/:' + id, abilities);
  }
    
  deleteAbility(id: string) {
    return this.http.delete<Ability>(this.apiUrl + this.name + '/:' + id);
  }
}