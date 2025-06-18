import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SkillsService } from './skills.service';
import { Ability } from '../../models/ability.model';
import { Skill } from '../../models/skill.model';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl + '/skills';

describe('SkillsService', () => {
  let service: SkillsService;
  let httpMock: HttpTestingController;

    const mockAbility: Ability = {
        id: 1,
        name: 'Force',
        description: 'Description',
        short_desc: 'Desc',
    };

  const mockSkill: Skill = {
    id: 1,
    name: 'Acrobaties',
    description: 'Description de la compétence',
    ability: [mockAbility],
    playerSkill: [],
    backgroundSkill: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SkillsService]
    });
    service = TestBed.inject(SkillsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getskills', () => {
    it('should return skills (success)', () => {
      service.getskills().subscribe((skills) => {
        expect(skills).toEqual([mockSkill]);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([mockSkill]);
    });
    it('should handle error', () => {
      service.getskills().subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(500);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getskillsById', () => {
    it('should return skill by id (success)', () => {
      service.getskillsById('1').subscribe((skill) => {
        expect(skill).toEqual(mockSkill);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockSkill);
    });
    it('should handle error', () => {
      service.getskillsById('1').subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addskills', () => {
    it('should add skill (success)', () => {
      service.addskills(mockSkill).subscribe((skill) => {
        expect(skill).toEqual(mockSkill);
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockSkill);
    });
    it('should handle error', () => {
      service.addskills(mockSkill).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(400);
        }
      });
      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateskills', () => {
    it('should update skill (success)', () => {
      service.updateskills('1', mockSkill).subscribe((skill) => {
        expect(skill).toEqual(mockSkill);
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('PATCH');
      req.flush(mockSkill);
    });
    it('should handle error', () => {
      service.updateskills('1', mockSkill).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteskills', () => {
    it('should delete skill (success)', () => {
      service.deleteskills('1').subscribe((skill) => {
        expect(skill).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + '/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
    it('should handle error', () => {
      service.deleteskills('1').subscribe({
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
