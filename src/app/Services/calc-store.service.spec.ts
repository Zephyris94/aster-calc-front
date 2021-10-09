import { TestBed } from '@angular/core/testing';

import { CalcStoreService } from './calc-store.service';

describe('CalcStoreService', () => {
  let service: CalcStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
