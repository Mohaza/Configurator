import { TestBed } from '@angular/core/testing';

import { ButtonSettingsService } from './button-settings.service';

describe('ButtonSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ButtonSettingsService = TestBed.get(ButtonSettingsService);
    expect(service).toBeTruthy();
  });
});
