import { TestBed } from '@angular/core/testing';

import { ConfigurationXmlService } from './configuration-xml.service';

describe('ConfigurationXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationXmlService = TestBed.get(ConfigurationXmlService);
    expect(service).toBeTruthy();
  });
});
