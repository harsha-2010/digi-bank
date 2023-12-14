import { TestBed } from '@angular/core/testing';

import { CurrencyConfigurationService } from './currency-configuration.service';

describe('CurrencyConfigurationService', () => {
  let service: CurrencyConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
