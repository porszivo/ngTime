import { TestBed, inject } from '@angular/core/testing';

import { TimesheetbeanService } from './timesheetbean.service';

describe('TimesheetbeanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesheetbeanService]
    });
  });

  it('should be created', inject([TimesheetbeanService], (service: TimesheetbeanService) => {
    expect(service).toBeTruthy();
  }));
});
