import { TestBed } from '@angular/core/testing';

import { ManageProjectService } from './manage-project.service';

describe('ManageProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageProjectService = TestBed.get(ManageProjectService);
    expect(service).toBeTruthy();
  });
});
