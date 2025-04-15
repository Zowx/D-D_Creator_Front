import { TestBed } from '@angular/core/testing';

import { AttributionCarcteristiqueService } from './attribution-carcteristique.service';

describe('AttributionCarcteristiqueService', () => {
  let service: AttributionCarcteristiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributionCarcteristiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
