import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlignementService {

  constructor(private http: HttpClient) {}

  //http://localhost:3000/alignments

  getAllAlignements() {
    console.log('Fetching alignments from the server...');
    return this.http.get<any[]>('http://localhost:3000/alignments');
  }
}
