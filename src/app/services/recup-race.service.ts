import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRaces, IAsi } from '../interfaces/iraces';

@Injectable({
  providedIn: 'root',
})
export class RecupRaceService {
  constructor(private http: HttpClient) {}

  private apiRoutes: any = {
    races: 'https://api.open5e.com/v1/races/?format=json',
  };

  public getAllRaces(): Observable<IRaces[]> {
    return this.http
      .get(this.apiRoutes.races)
      .pipe(map((data: any) => data.results as IRaces[]));
  }

}
