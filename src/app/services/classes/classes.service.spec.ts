import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClassesService } from './classes.service';
import { Class } from '../../models/class.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl + '/classes';

describe('ClassesService', () => {
  let service: ClassesService;
  let httpMock: HttpTestingController;

  const mockClass: Class = {
    id: '1',
    name: 'Guerrier',
    hitDice: 'd10',
    savingThrows: ['1', '2'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassesService]
    });
    service = TestBed.inject(ClassesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getClasses', () => {
    it('should return classes (success)', () => {
      service.getClasses().subscribe((classes) => {
        expect(classes).toEqual([mockClass]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockClass]);
    });
    it('should handle error', () => {
      service.getClasses().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getClassById', () => {
    it('should return class by id (success)', () => {
      service.getClassById('1').subscribe((classe) => {
        expect(classe).toEqual(mockClass);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockClass);
    });
    it('should handle error', () => {
      service.getClassById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addClass', () => {
    it('should add class (success)', () => {
      service.addClass(mockClass).subscribe((classe) => {
        expect(classe).toEqual(mockClass);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockClass);
    });
    it('should handle error', () => {
      service.addClass(mockClass).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateClass', () => {
    it('should update class (success)', () => {
      service.updateClass('1', mockClass).subscribe((classe) => {
        expect(classe).toEqual(mockClass);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockClass);
    });
    it('should handle error', () => {
      service.updateClass('1', mockClass).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteClass', () => {
    it('should delete class (success)', () => {
      service.deleteClass('1').subscribe((classe) => {
        expect(classe).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteClass('1').subscribe({
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
