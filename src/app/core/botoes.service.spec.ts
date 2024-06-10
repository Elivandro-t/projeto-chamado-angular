import { TestBed } from '@angular/core/testing';

import { BotoesService } from './botoes.service';

describe('BotoesService', () => {
  let service: BotoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
