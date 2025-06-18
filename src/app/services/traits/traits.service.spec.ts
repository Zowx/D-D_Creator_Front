import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TraitsService } from './traits.service';
import { Trait } from '../../models/traits.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl + '/traits';

describe('TraitsService', () => {
  let service: TraitsService;
  let httpMock: HttpTestingController;

  const mockTrait: Trait = {
    id: 1,
    name: 'Robuste',
    description: 'Augmente les PV.',
    shortDescription: 'Description courte.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TraitsService]
    });
    service = TestBed.inject(TraitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTraits', () => {
    it('should return traits (success)', () => {
      service.getTraits().subscribe((traits) => {
        expect(traits).toEqual([mockTrait]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockTrait]);
    });
    it('should handle error', () => {
      service.getTraits().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getTraitById', () => {
    it('should return trait by id (success)', () => {
      service.getTraitById('1').subscribe((trait) => {
        expect(trait).toEqual(mockTrait);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockTrait);
    });
    it('should handle error', () => {
      service.getTraitById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addTrait', () => {
    it('should add trait (success)', () => {
      service.addTrait(mockTrait).subscribe((trait) => {
        expect(trait).toEqual(mockTrait);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockTrait);
    });
    it('should handle error', () => {
      service.addTrait(mockTrait).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateTrait', () => {
    it('should update trait (success)', () => {
      service.updateTrait('1', mockTrait).subscribe((trait) => {
        expect(trait).toEqual(mockTrait);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockTrait);
    });
    it('should handle error', () => {
      service.updateTrait('1', mockTrait).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteTrait', () => {
    it('should delete trait (success)', () => {
      service.deleteTrait('1').subscribe((trait) => {
        expect(trait).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteTrait('1').subscribe({
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
