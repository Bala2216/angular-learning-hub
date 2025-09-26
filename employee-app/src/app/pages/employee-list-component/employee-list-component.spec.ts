import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list-component';
import { CommonModule } from '@angular/common';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sortedEmployees as an empty array', () => {
    expect(component.sortedEmployees).toEqual([]);
  });

  it('should sort and capitalize employee names on ngOnChanges', () => {
    const employees = [{ name: 'john doe' }, { name: 'jane smith' }];
    const sortedEmployees = [{ name: 'John doe' }, { name: 'Jane smith' }];
    const changes: SimpleChanges = {
      employees: new SimpleChange(null, employees, true),
    };

    component.employees = employees;
    component.ngOnChanges(changes);
    fixture.detectChanges();

    expect(component.sortedEmployees).toEqual(sortedEmployees);
  });

  it('should emit the deleteRow event with the correct index', () => {
    // Arrange
    const emitSpy = jest.spyOn(component.deleteRow, 'emit');
    const indexToDelete = 1;

    // Act
    component.onDelete(indexToDelete);

    // Assert
    expect(emitSpy).toHaveBeenCalledWith(indexToDelete);
  });

  it('should handle null or empty names gracefully during capitalization', () => {
    // Arrange
    const employees = [{ name: 'test' }, { name: null }, { name: '' }];
    const expectedSortedEmployees = [{ name: 'Test' }, { name: null }, { name: '' }];
    const changes: SimpleChanges = {
      employees: new SimpleChange(null, employees, true),
    };

    // Act
    component.employees = employees;
    component.ngOnChanges(changes);
    fixture.detectChanges();

    // Assert
    expect(component.sortedEmployees).toEqual(expectedSortedEmployees);
  });

  it('should not update sortedEmployees if the "employees" input has not changed', () => {
    // Arrange
    const employees = [{ name: 'test' }];
    component.employees = employees;
    component.ngOnChanges({ employees: new SimpleChange(null, employees, true) }); // First change

    // Act
    const changes: SimpleChanges = {}; // No changes to inputs
    component.ngOnChanges(changes);

    // Assert
    // `sortedEmployees` should remain unchanged from the previous `ngOnChanges` call
    expect(component.sortedEmployees).toEqual([{ name: 'Test' }]);
  });
});
