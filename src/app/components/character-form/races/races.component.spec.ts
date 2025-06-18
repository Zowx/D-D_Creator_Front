import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RacesService } from '../../../services/races/races.service';
import { Race } from '../../../models/race.model';
import { environment } from '../../../../environments/environment';

const apiUrl = environment.apiUrl + '/races';

describe('RacesService', () => {
  let service: RacesService;
  let httpMock: HttpTestingController;

  const mockRace: Race = {
    id: '1',
    name: 'Elfe',
    description: 'Description de la race',
    traitsId: ['t1', 't2'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RacesService]
    });
    service = TestBed.inject(RacesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRaces', () => {
    it('should return races (success)', () => {
      service.getRaces().subscribe((races) => {
        expect(races).toEqual([mockRace]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockRace]);
    });
    it('should handle error', () => {
      service.getRaces().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getRaceById', () => {
    it('should return race by id (success)', () => {
      service.getRaceById('1').subscribe((race) => {
        expect(race).toEqual(mockRace);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockRace);
    });
    it('should handle error', () => {
      service.getRaceById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addRace', () => {
    it('should add race (success)', () => {
      service.addRace(mockRace).subscribe((race) => {
        expect(race).toEqual(mockRace);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockRace);
    });
    it('should handle error', () => {
      service.addRace(mockRace).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateRace', () => {
    it('should update race (success)', () => {
      service.updateRace('1', mockRace).subscribe((race) => {
        expect(race).toEqual(mockRace);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockRace);
    });
    it('should handle error', () => {
      service.updateRace('1', mockRace).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteRace', () => {
    it('should delete race (success)', () => {
      service.deleteRace('1').subscribe((race) => {
        expect(race).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteRace('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });
});
