import { TestBed } from '@angular/core/testing';

import { RecupClasseService } from './recup-classe.service';

describe('RecupClasseService', () => {
  let service: RecupClasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupClasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
