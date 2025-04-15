import { TestBed } from '@angular/core/testing';

import { RecupRaceService } from './recup-race.service';

describe('RecupRaceService', () => {
  let service: RecupRaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupRaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
