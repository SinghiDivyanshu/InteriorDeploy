import { TestBed } from '@angular/core/testing';

import { ProjectIDService } from './project-id.service';

describe('ProjectIDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectIDService = TestBed.get(ProjectIDService);
    expect(service).toBeTruthy();
  });
});
