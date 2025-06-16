import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Class } from '../../models/class.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private name = '/classes';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get<Class[]>(this.apiUrl + this.name);
  }

  getClassById(id: string) {
    return this.http.get<Class>(this.apiUrl + this.name + '/:' + id);
  }
  
  addClass(classData: Class) {
    return this.http.post<Class>(this.apiUrl + this.name, classData);
  }
  updateClass(id: string, classData: Class) {
    return this.http.patch<Class>(this.apiUrl + this.name + '/:' + id, classData);
  }
  deleteClass(id: string) {
    return this.http.delete<Class>(this.apiUrl + this.name + '/:' + id);
  }
}
