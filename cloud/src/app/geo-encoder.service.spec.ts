import { TestBed } from '@angular/core/testing';

import { GeoEncoderService } from './geo-encoder.service';

describe('GeoEncoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoEncoderService = TestBed.get(GeoEncoderService);
    expect(service).toBeTruthy();
  });
});
