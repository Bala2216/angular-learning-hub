// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EmployeeListComponent } from './employee-list.component';

// describe('EmployeeListComponent', () => {
//   let component: EmployeeListComponent;
//   let fixture: ComponentFixture<EmployeeListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [EmployeeListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(EmployeeListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { SubscriptionService } from '../subscription-service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { ChangeDetectorRef, Renderer2, ElementRef, SimpleChanges } from '@angular/core';

// Mock data for the services
const MOCK_EMPLOYEES = [
  { name: 'John Doe', email: 'john.doe@test.com', department: 'IT', employmentType: 'Full-time', gender: 'Male' },
  { name: 'Jane Smith', email: 'jane.smith@test.com', department: 'Accounts', employmentType: 'Part-time', gender: 'Female' }
];

const MOCK_ROLES = {
  it: 'admin-read',
  accounts: 'user-read',
  management: 'admin-full'
};

// Mock classes for dependencies
class MockEmployeeService {
  getEmployees(filterString?: string) {
    if (filterString) {
      return of(MOCK_EMPLOYEES.filter(e => e.name.toLowerCase().includes(filterString.toLowerCase())));
    }
    return of(MOCK_EMPLOYEES);
  }
  getRoles() {
    return of(MOCK_ROLES);
  }
}

class MockSubscriptionService {
  subscriptionsSearchStr$ = new BehaviorSubject<string>('');
  subscriptionsGenderSelection$ = new BehaviorSubject<string>('');
  add(employee: any) { }
}

class MockRouter {
  navigate(path: string[]) { }
}

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeService: MockEmployeeService;
  let mockSubscriptionService: MockSubscriptionService;
  let mockRouter: MockRouter;
  let mockChangeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    mockEmployeeService = new MockEmployeeService();
    mockSubscriptionService = new MockSubscriptionService();
    mockRouter = new MockRouter();
    
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: SubscriptionService, useValue: mockSubscriptionService },
        { provide: Router, useValue: mockRouter },
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['addClass']) },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    mockChangeDetectorRef = TestBed.inject(ChangeDetectorRef);

    // Mock the MatTable and ElementRef ViewChild properties
    component.table = { renderRows: jasmine.createSpy('renderRows') } as unknown as MatTable<any>;
    component.myElementRef = { nativeElement: {} } as ElementRef;

    // Spy on the change detection to ensure it's called
    spyOn(mockChangeDetectorRef, 'detectChanges');

    fixture.detectChanges(); // Initial change detection to call ngOnInit
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization and update dataSource', (done) => {
    // ngOnInit is called during fixture.detectChanges()
    expect(component.dataSource.length).toEqual(MOCK_EMPLOYEES.length);
    expect(component.dataSource[0].name).toEqual(MOCK_EMPLOYEES[0].name);
    done();
  });

  it('should navigate to employee-onboard when toenroll is called', () => {
    spyOn(mockRouter, 'navigate');
    component.toenroll();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employee-onboard']);
  });

  it('should navigate to dashboard when toDashboard is called', () => {
    spyOn(mockRouter, 'navigate');
    component.toDashboard();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  
  it('should filter data based on the subscriptionSearchStr$', () => {
    // Act
    mockSubscriptionService.subscriptionsSearchStr$.next('john');
    
    // Assert
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].name).toBe('John Doe');
  });

  it('should handle empty filter string from subscriptionSearchStr$', () => {
    // Act
    mockSubscriptionService.subscriptionsSearchStr$.next('');

    // Assert
    expect(component.dataSource.length).toBe(MOCK_EMPLOYEES.length);
  });
  
  it('should filter data based on gender selection', () => {
    // This assumes the `role` property is being added to the data
    component.data = [
      { name: 'John Doe', email: 'john.doe@test.com', department: 'IT', role: 'admin-read' },
      { name: 'Jane Smith', email: 'jane.smith@test.com', department: 'Accounts', role: 'user-read' }
    ] as any;

    // Act
    mockSubscriptionService.subscriptionsGenderSelection$.next('admin-read');

    // Assert
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].name).toBe('John Doe');
  });

  it('should handle empty gender selection string', () => {
    // Act
    mockSubscriptionService.subscriptionsGenderSelection$.next('');
    
    // Assert
    expect(component.dataSource.length).toBe(MOCK_EMPLOYEES.length);
  });

  it('should call fetchOnPageLoad when subscriptionsSearchStr$ has a value', () => {
    spyOn(component, 'fetchOnPageLoad').and.callThrough();
    mockSubscriptionService.subscriptionsSearchStr$.next('test');
    expect(component.fetchOnPageLoad).toHaveBeenCalledWith('test');
  });

  it('should call fetchOnPageLoad with no arguments for an empty search string', () => {
    spyOn(component, 'fetchOnPageLoad').and.callThrough();
    mockSubscriptionService.subscriptionsSearchStr$.next('');
    expect(component.fetchOnPageLoad).toHaveBeenCalledWith('');
  });

  it('should react to changes in the @Input() message', () => {
    const changes: SimpleChanges = {
      message: {
        previousValue: 'old message',
        currentValue: 'new message',
        firstChange: false,
        isFirstChange: () => false
      }
    };
    spyOn(console, 'log');
    component.ngOnChanges(changes);
    expect(console.log).toHaveBeenCalledWith('ngOnChanges: message changed from', 'old message', 'to', 'new message');
  });
});

