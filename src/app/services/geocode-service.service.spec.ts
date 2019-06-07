import { TestBed } from '@angular/core/testing';

import { GeocodeServiceService } from './geocode-service.service';

describe('GeocodeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocodeServiceService = TestBed.get(GeocodeServiceService);
    expect(service).toBeTruthy();
  });
});
