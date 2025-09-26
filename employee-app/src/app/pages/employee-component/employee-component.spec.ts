import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee-component';
import { EmployeeService } from './employee-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list-component/employee-list-component';
import { EmployeeFormComponent } from '../employee-form-component/employee-form-component';
import { inject } from '@angular/core';

// Create a mock version of the EmployeeService
// This prevents tests from relying on the real service implementation.
const mockEmployeeService = {
  getEmployeeList: jest.fn(),
  addEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
};

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    // Configure the testing module using TestBed
    await TestBed.configureTestingModule({
      imports: [
        EmployeeComponent, // Assuming a standalone component based on the provided code.
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        // Mock child components to perform shallow testing
        // This ensures the test only focuses on the EmployeeComponent's logic.
        EmployeeListComponent,
        EmployeeFormComponent,
      ],
      providers: [
        // Provide the mock service instead of the real one
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compileComponents();

    // Reset all mock function implementations and call counts before each test
    jest.clearAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize employeeList with data from the service on ngOnInit', () => {
    // Arrange
    const dummyEmployees = [{ name: 'John Doe' }];
    mockEmployeeService.getEmployeeList.mockReturnValue(dummyEmployees);

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(mockEmployeeService.getEmployeeList).toHaveBeenCalled();
    expect(component.employeeList).toEqual(dummyEmployees);
  });

  it('should toggle the showForm property', () => {
    // Arrange
    component.showForm = false;

    // Act
    component.toggleView();

    // Assert
    expect(component.showForm).toBe(true);

    // Act again to ensure it toggles back
    component.toggleView();

    // Assert
    expect(component.showForm).toBe(false);
  });

  it('should add a new employee, update the list, and hide the form', () => {
    // Arrange
    const newEmployee = { name: 'Jane Doe' };
    const updatedEmployeeList = [{ name: 'John Doe' }, { name: 'Jane Doe' }];

    mockEmployeeService.addEmployee.mockImplementation(() => {});
    mockEmployeeService.getEmployeeList.mockReturnValue(updatedEmployeeList);
    component.showForm = true;

    // Act
    component.handleAddEmployee(newEmployee);

    // Assert
    expect(mockEmployeeService.addEmployee).toHaveBeenCalledWith(newEmployee);
    expect(mockEmployeeService.getEmployeeList).toHaveBeenCalled();
    expect(component.employeeList).toEqual(updatedEmployeeList);
    expect(component.showForm).toBe(false);
  });

  it('should delete an employee and update the list', () => {
    // Arrange
    const initialEmployees = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    const remainingEmployees = [{ name: 'Jane Doe' }];

    mockEmployeeService.getEmployeeList.mockReturnValueOnce(initialEmployees);
    component.ngOnInit();
    fixture.detectChanges();

    mockEmployeeService.deleteEmployee.mockImplementation(() => {});
    mockEmployeeService.getEmployeeList.mockReturnValue(remainingEmployees);
    const indexToDelete = 0;

    // Act
    component.handleDelete(indexToDelete);

    // Assert
    expect(mockEmployeeService.deleteEmployee).toHaveBeenCalledWith(indexToDelete);
    expect(mockEmployeeService.getEmployeeList).toHaveBeenCalled();
    expect(component.employeeList).toEqual(remainingEmployees);
  });
});

