import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackgroundService } from './background.service';
import { Background } from '../../models/background.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl + '/backgrounds';

describe('BackgroundService', () => {
  let service: BackgroundService;
  let httpMock: HttpTestingController;

  const mockBackground: Background = {
    id: '1',
    name: 'Acolyte',
    description: 'Description',
    abilityChoice: 1,
    skillsIds: [],
    skillChoice: 1,
    languagesIds: [],
    languagesChoice: 1,
    featureName: 'Feature',
    featureDescription: 'Feature desc',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackgroundService]
    });
    service = TestBed.inject(BackgroundService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBackgrounds', () => {
    it('should return backgrounds (success)', () => {
      service.getAllBackgrounds().subscribe((backgrounds) => {
        expect(backgrounds).toEqual([mockBackground]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockBackground]);
    });
    it('should handle error', () => {
      service.getAllBackgrounds().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getBackgroundById', () => {
    it('should return background by id (success)', () => {
      service.getBackgroundById('1').subscribe((background) => {
        expect(background).toEqual(mockBackground);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockBackground);
    });
    it('should handle error', () => {
      service.getBackgroundById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addBackground', () => {
    it('should add background (success)', () => {
      service.addBackground(mockBackground).subscribe((background) => {
        expect(background).toEqual(mockBackground);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockBackground);
    });
    it('should handle error', () => {
      service.addBackground(mockBackground).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateBackground', () => {
    it('should update background (success)', () => {
      service.updateBackground('1', mockBackground).subscribe((background) => {
        expect(background).toEqual(mockBackground);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockBackground);
    });
    it('should handle error', () => {
      service.updateBackground('1', mockBackground).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteBackground', () => {
    it('should delete background (success)', () => {
      service.deleteBackground('1').subscribe((background) => {
        expect(background).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteBackground('1').subscribe({
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
