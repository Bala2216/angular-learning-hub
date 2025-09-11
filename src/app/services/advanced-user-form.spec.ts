import { TestBed } from '@angular/core/testing';

import { AdvancedUserForm } from './advanced-user-form';

describe('AdvancedUserForm', () => {
  let service: AdvancedUserForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedUserForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
