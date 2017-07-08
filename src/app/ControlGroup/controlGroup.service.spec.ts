import { TestBed, inject } from '@angular/core/testing';

import { ControlGroupService } from './controlGroup.service';

describe('ControlGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlGroupService]
    });
  });

  it('should be created', inject([ControlGroupService], (service: ControlGroupService) => {
    expect(service).toBeTruthy();
  }));
});
