import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IHistorique } from '../interfaces/ihistorique';


@Injectable({
  providedIn: 'root'
})
export class RecupHistoriqueService {

  constructor(private http: HttpClient) {}
  private apiRoutes: any = {
    historique: 'https://api.open5e.com/v1/backgrounds/?format=json',

  };

  public getAllHistorique(): Observable<IHistorique[]> {
    return this.http.get(this.apiRoutes.historique).pipe(
      map((data: any) => data.results as IHistorique[])
    );
  }
}
