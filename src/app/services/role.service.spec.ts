import { TestBed } from '@angular/core/testing';
import { RoleService } from './role.service';
import { take } from 'rxjs/operators';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [RoleService]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty role if localStorage is empty', () => {
    expect(service.roleSignalValue).toBe('');
    service.role$.pipe(take(1)).subscribe(role => {
      expect(role).toBe('');
    });
  });

  it('should initialize with role from localStorage if available', () => {
    localStorage.setItem('selectedRole', 'admin');

    const newService = new RoleService();

    expect(newService.roleSignalValue).toBe('admin');
    newService.role$.pipe(take(1)).subscribe(role => {
      expect(role).toBe('admin');
    });
  });

  it('should update role via setRole()', () => {
    service.setRole('manager');

    expect(localStorage.getItem('selectedRole')).toBe('manager');
    expect(service.roleSignalValue).toBe('manager');

    service.role$.pipe(take(1)).subscribe(role => {
      expect(role).toBe('manager');
    });
  });

  it('should emit new role value on role$ observable', (done) => {
    const expectedRole = 'developer';

    service.role$.pipe(take(1)).subscribe(role => {
      expect(role).toBe('');
    });

    service.setRole(expectedRole);

    service.role$.pipe(take(1)).subscribe(role => {
      expect(role).toBe(expectedRole);
      done();
    });
  });
});
