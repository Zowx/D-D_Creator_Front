import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlignmentService {
  constructor(private readonly http: HttpClient) {}

  getAllAlignments() {
    console.log('Fetching alignments from the server...');
    return this.http.get<any[]>(`${environment.apiUrl}/alignments`);
  }
}
