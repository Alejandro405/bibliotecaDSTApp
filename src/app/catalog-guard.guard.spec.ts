import { TestBed } from '@angular/core/testing';

import { CatalogGuardGuard } from './catalog-guard.guard';

describe('CatalogGuardGuard', () => {
  let guard: CatalogGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CatalogGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
