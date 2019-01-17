import { TestBed } from '@angular/core/testing';

import { SleepLogService } from './sleep-log.service';

describe('SleepLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SleepLogService = TestBed.get(SleepLogService);
    expect(service).toBeTruthy();
  });
});
