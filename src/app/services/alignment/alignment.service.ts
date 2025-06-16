import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlignmentService {

  constructor(private http: HttpClient) {}

  //http://localhost:3000/alignments

  getAllAlignments() {
    console.log('Fetching alignments from the server...');
    return this.http.get<any[]>('http://localhost:3000/alignments');
  }
}
