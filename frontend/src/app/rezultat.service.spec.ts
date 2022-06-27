import { TestBed } from '@angular/core/testing';

import { RezultatService } from './rezultat.service';

describe('RezultatService', () => {
  let service: RezultatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RezultatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
