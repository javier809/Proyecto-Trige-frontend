import { TestBed } from '@angular/core/testing';

import { RecursoHopitalarioService } from './recurso-hopitalario.service';

describe('RecursoHopitalarioService', () => {
  let service: RecursoHopitalarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoHopitalarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
