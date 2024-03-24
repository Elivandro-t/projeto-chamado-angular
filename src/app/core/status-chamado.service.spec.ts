import { TestBed } from '@angular/core/testing';

import { StatusChamadoService } from './status-chamado.service';

describe('StatusChamadoService', () => {
  let service: StatusChamadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusChamadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
