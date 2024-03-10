import { TestBed } from '@angular/core/testing';

import { ChamadoApiService } from './chamado-api.service';

describe('ChamadoApiService', () => {
  let service: ChamadoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
