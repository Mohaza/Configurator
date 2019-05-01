import { TestBed } from '@angular/core/testing';

import { ServiceTagService } from './service-tag.service';

describe('ServiceTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceTagService = TestBed.get(ServiceTagService);
    expect(service).toBeTruthy();
  });
});
