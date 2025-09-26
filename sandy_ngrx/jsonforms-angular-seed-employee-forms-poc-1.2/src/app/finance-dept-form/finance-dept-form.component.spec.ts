import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDeptFormComponent } from './finance-dept-form.component';

describe('FinanceDeptFormComponent', () => {
  let component: FinanceDeptFormComponent;
  let fixture: ComponentFixture<FinanceDeptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDeptFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDeptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
