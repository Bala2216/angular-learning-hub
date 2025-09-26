import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeDataComponent } from './new-employee-data.component';

describe('NewEmployeeDataComponent', () => {
  let component: NewEmployeeDataComponent;
  let fixture: ComponentFixture<NewEmployeeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmployeeDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmployeeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
