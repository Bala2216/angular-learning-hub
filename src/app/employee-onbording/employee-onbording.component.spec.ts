import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnbordingComponent } from './employee-onbording.component';

describe('EmployeeOnbordingComponent', () => {
  let component: EmployeeOnbordingComponent;
  let fixture: ComponentFixture<EmployeeOnbordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOnbordingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOnbordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
