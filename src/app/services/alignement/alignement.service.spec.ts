import { TestBed } from '@angular/core/testing';

import { AlignementService } from './alignement.service';

describe('AlignementService', () => {
  let service: AlignementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlignementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
