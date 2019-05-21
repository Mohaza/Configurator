import { TestBed } from '@angular/core/testing';

import { ConfigurationFtpService } from './configuration-ftp.service';

describe('ConfigurationFtpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationFtpService = TestBed.get(ConfigurationFtpService);
    expect(service).toBeTruthy();
  });
});
