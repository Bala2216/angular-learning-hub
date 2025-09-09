import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDeptFormComponent } from './hr-dept-form.component';

describe('HrDeptFormComponent', () => {
  let component: HrDeptFormComponent;
  let fixture: ComponentFixture<HrDeptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrDeptFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrDeptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
