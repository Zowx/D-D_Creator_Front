import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Iclasses } from '../interfaces/iclasses';

@Injectable({
  providedIn: 'root',
})
export class RecupClasseService {
  constructor(private http: HttpClient) {}

  private apiRoutes: any = {
    classes: 'https://api.open5e.com/v1/classes/?format=json',
  };

  public getAllClasses(): Observable<Iclasses[]> {
    return this.http.get(this.apiRoutes.classes).pipe(
      // pipe = prend la data la "retravail" cad execute une fonction sur la donnée avant de la retourner
      map((data: any) => data.results as Iclasses[]) // parcourir la liste/tableau pour executer une fonction sur chaque élément
    );
  }
}
