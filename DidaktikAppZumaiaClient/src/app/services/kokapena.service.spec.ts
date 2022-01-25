import { TestBed } from '@angular/core/testing';

import { KokapenaService } from './kokapena.service';

describe('KokapenakService', () => {
  let service: KokapenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KokapenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
