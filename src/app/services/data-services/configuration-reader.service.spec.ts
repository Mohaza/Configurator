import { TestBed } from '@angular/core/testing';

import { ConfigurationReaderService } from './configuration-reader.service';

describe('ConfigurationReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationReaderService = TestBed.get(ConfigurationReaderService);
    expect(service).toBeTruthy();
  });
});
