import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { By } from '@angular/platform-browser';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    component.showForm = true;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display modal when showForm is true', () => {
    const modal = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(modal).toBeTruthy();
  });

  it('should not display modal when showForm is false', () => {
    component.showForm = false;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(modal).toBeFalsy();
  });

  it('should bind name input', () => {
    const input = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    input.value = 'Rahul';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUser.name).toBe('Rahul');
  });

  it('should bind username input', () => {
    const input = fixture.debugElement.query(By.css('input[placeholder="Username"]')).nativeElement;
    input.value = 'rkumar';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUser.username).toBe('rkumar');
  });

  it('should bind email input', () => {
    const input = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    input.value = 'rkumar@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUser.email).toBe('rkumar@example.com');
  });

  it('should bind comment textarea', () => {
    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea.value = 'This is a comment';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newUser.body).toBe('This is a comment');
  });

  it('should call onSave when Save button is clicked', () => {
    spyOn(component, 'onSave');
    const saveButton = fixture.debugElement.query(By.css('button')).nativeElement;
    saveButton.click();
    expect(component.onSave).toHaveBeenCalled();
  });

  it('should call onCancel when Cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    const cancelButton = fixture.debugElement.query(By.css('button.cancel')).nativeElement;
    cancelButton.click();
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should hide modal on cancel', () => {
    spyOn(component.closeForm, 'emit');
    component.onCancel();
    expect(component.closeForm.emit).toHaveBeenCalled();
  });

  it('should hide modal on valid save', () => {
    spyOn(component.addUser, 'emit');

    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    nameInput.value = 'Rahul';
    nameInput.dispatchEvent(new Event('input'));

    const usernameInput = fixture.debugElement.query(By.css('input[placeholder="Username"]')).nativeElement;
    usernameInput.value = 'rkumar';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    emailInput.value = 'rahul@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    const bodyTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    bodyTextarea.value = 'Test comment';
    bodyTextarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    component.onSave();

    expect(component.addUser.emit).toHaveBeenCalledWith({
      name: 'Rahul',
      username: 'rkumar',
      email: 'rahul@gmail.com',
      body: 'Test comment'
    });
  });

  it('should not hide modal if only name is provided', () => {
    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    nameInput.value = 'Rahul';
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSave();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should not hide modal if only email is provided', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    emailInput.value = 'rahul@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSave();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should not hide modal if only username is provided', () => {
    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    nameInput.value = 'Rahul';
    nameInput.dispatchEvent(new Event('input'));

    const usernameInput = fixture.debugElement.query(By.css('input[placeholder="Username"]')).nativeElement;
    usernameInput.value = 'rkumar';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSave();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should use default comment if body is empty', () => {
    spyOn(component.addUser, 'emit');

    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    nameInput.value = 'Rahul';
    nameInput.dispatchEvent(new Event('input'));

    const usernameInput = fixture.debugElement.query(By.css('input[placeholder="Username"]')).nativeElement;
    usernameInput.value = 'rkumar';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    emailInput.value = 'rahul@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    const bodyTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    bodyTextarea.value = '';
    bodyTextarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    component.onSave();

    expect(component.addUser.emit).toHaveBeenCalledWith({
      name: 'Rahul',
      username: 'rkumar',
      email: 'rahul@gmail.com',
      body: 'No comment available'
    });
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    expect(title?.textContent).toContain('Add New User');
  });
});
