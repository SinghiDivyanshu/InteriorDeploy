import { TestBed } from '@angular/core/testing';

import { FormAPIService } from './form-api.service';

describe('FormAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormAPIService = TestBed.get(FormAPIService);
    expect(service).toBeTruthy();
  });
});
