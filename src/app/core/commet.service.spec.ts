import { TestBed } from '@angular/core/testing';

import { CommetService } from './commet.service';

describe('CommetService', () => {
  let service: CommetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
