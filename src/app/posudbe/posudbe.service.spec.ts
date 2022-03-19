import { TestBed } from '@angular/core/testing';

import { PosudbeService } from './posudbe.service';

describe('PosudbeService', () => {
  let service: PosudbeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosudbeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
