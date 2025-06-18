import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AbilityService } from '../../../services/ability/ability.service';
import { Ability } from '../../../models/ability.model';
import { environment } from '../../../../environments/environment';

const apiUrl = environment.apiUrl + '/abilities';

describe('AbilityService', () => {
  let service: AbilityService;
  let httpMock: HttpTestingController;

  const mockAbility: Ability = {
    id: 1,
    name: 'Force',
    description: 'Description',
    short_desc: 'Desc',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AbilityService]
    });
    service = TestBed.inject(AbilityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAbilities', () => {
    it('should return abilities (success)', () => {
      service.getAbilities().subscribe((abilities) => {
        expect(abilities).toEqual([mockAbility]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockAbility]);
    });

    it('should handle error', () => {
      service.getAbilities().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getAbilityById', () => {
    it('should return ability by id (success)', () => {
      service.getAbilityById('1').subscribe((ability) => {
        expect(ability).toEqual(mockAbility);
      });
      const req = httpMock.expectOne(apiUrl + '/:1');
      expect(req.request.method).toBe('GET');
      req.flush(mockAbility);
    });

    it('should handle error', () => {
      service.getAbilityById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/:1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addAbility', () => {
    it('should add ability (success)', () => {
      service.addAbility(mockAbility).subscribe((ability) => {
        expect(ability).toEqual(mockAbility);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockAbility);
    });

    it('should handle error', () => {
      service.addAbility(mockAbility).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateAbility', () => {
    it('should update ability (success)', () => {
      service.updateAbility('1', mockAbility).subscribe((ability) => {
        expect(ability).toEqual(mockAbility);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockAbility);
    });

    it('should handle error', () => {
      service.updateAbility('1', mockAbility).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteAbility', () => {
    it('should delete ability (success)', () => {
      service.deleteAbility('1').subscribe((ability) => {
        expect(ability).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/:1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle error', () => {
      service.deleteAbility('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/:1');
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });
});
