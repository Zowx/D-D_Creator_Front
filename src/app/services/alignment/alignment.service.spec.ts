import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlignmentService } from './alignment.service';
import { environment } from '../../../testing/environment-mock';

describe('AlignmentService', () => {
  let service: AlignmentService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/alignments';

  const mockAlignments = [
    { id: 1, name: 'Loyal Bon', description: 'Description 1' },
    { id: 2, name: 'Chaotique Mauvais', description: 'Description 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlignmentService]
    });
    service = TestBed.inject(AlignmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllAlignments', () => {
    it('should return all alignments (success)', () => {
      service.getAllAlignments().subscribe((alignments) => {
        expect(alignments).toEqual(mockAlignments);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockAlignments);
    });

    it('should handle error', () => {
      service.getAllAlignments().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });
});
