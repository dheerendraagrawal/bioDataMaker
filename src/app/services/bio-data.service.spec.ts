import { TestBed } from '@angular/core/testing';

import { BioDataService } from './bio-data.service';

describe('BioDataService', () => {
  let service: BioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
