import { TestBed } from '@angular/core/testing';

import { TaxonomyService } from './taxonomy.service';

describe('TaxonomyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxonomyService = TestBed.get(TaxonomyService);
    expect(service).toBeTruthy();
  });
});
