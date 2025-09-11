import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedUserForm } from './advanced-user-form';

describe('AdvancedUserForm', () => {
  let component: AdvancedUserForm;
  let fixture: ComponentFixture<AdvancedUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedUserForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
