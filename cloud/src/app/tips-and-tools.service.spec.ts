import { TestBed } from '@angular/core/testing';

import { TipsAndToolsService } from './tips-and-tools.service';

describe('TipsAndToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsAndToolsService = TestBed.get(TipsAndToolsService);
    expect(service).toBeTruthy();
  });
});
