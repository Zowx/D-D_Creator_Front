import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../../models/skill.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private name = '/skills';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getskills() {
    return this.http.get<Skill[]>(this.apiUrl + this.name);
  }
  getskillsById(id: string) {
    return this.http.get<Skill>(this.apiUrl + this.name + '/' + id);
  }

  addskills(skills: Skill) {
    return this.http.post<Skill>(this.apiUrl + this.name, skills);
  }

  updateskills(id: string, skills: Skill) {
    return this.http.patch<Skill>(this.apiUrl + this.name + '/' + id, skills);
  }
  deleteskills(id: string) {
    return this.http.delete<Skill>(this.apiUrl + this.name + '/' + id);
  }
}
