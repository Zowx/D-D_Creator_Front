import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguagesService } from './languages.service';
import { Language } from '../../models/language.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl + '/languages';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let httpMock: HttpTestingController;

  const mockLanguage: Language = {
    id: 1,
    name: 'Elvish',
    description: 'Langue des elfes',
    exotic: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguagesService]
    });
    service = TestBed.inject(LanguagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLanguages', () => {
    it('should return languages (success)', () => {
      service.getLanguages().subscribe((languages) => {
        expect(languages).toEqual([mockLanguage]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockLanguage]);
    });
    it('should handle error', () => {
      service.getLanguages().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getLanguageById', () => {
    it('should return language by id (success)', () => {
      service.getLanguageById('1').subscribe((language) => {
        expect(language).toEqual(mockLanguage);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockLanguage);
    });
    it('should handle error', () => {
      service.getLanguageById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addLanguage', () => {
    it('should add language (success)', () => {
      service.addLanguage(mockLanguage).subscribe((language) => {
        expect(language).toEqual(mockLanguage);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockLanguage);
    });
    it('should handle error', () => {
      service.addLanguage(mockLanguage).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateLanguage', () => {
    it('should update language (success)', () => {
      service.updateLanguage('1', mockLanguage).subscribe((language) => {
        expect(language).toEqual(mockLanguage);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockLanguage);
    });
    it('should handle error', () => {
      service.updateLanguage('1', mockLanguage).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteLanguage', () => {
    it('should delete language (success)', () => {
      service.deleteLanguage('1').subscribe((language) => {
        expect(language).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteLanguage('1').subscribe({
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
