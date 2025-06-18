import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Character} from '../../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private name = '/characters';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

    getAllCharacter() {
      return this.http.get<Character[]>(this.apiUrl + this.name);
    }
  
    getCharacterById(id: string) {
      return this.http.get<Character>(this.apiUrl + this.name + '/' + id);
    }
  
    addCharacter(character: Character) {
      return this.http.post<any>(this.apiUrl + this.name, character);
    }
  
    updateCharacter(id: string, character: Character) { 
      return this.http.patch<any>(this.apiUrl + this.name + '/' + id, character);
    }
      
    deleteCharacter(id: string) {
      return this.http.delete<any>(this.apiUrl + this.name + '/' + id);
    }

}
