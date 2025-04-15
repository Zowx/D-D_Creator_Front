import { TestBed } from '@angular/core/testing';

import { RecupHistoriqueService } from './recup-historique.service';

describe('RecupHistoriqueService', () => {
  let service: RecupHistoriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupHistoriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
