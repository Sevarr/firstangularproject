import { TestBed } from '@angular/core/testing';

import { NewUserRegistrationService } from './new-user-registration.service';

describe('NewUserRegistrationService', () => {
  let service: NewUserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
