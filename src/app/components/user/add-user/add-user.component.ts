import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  @Input() showForm = false;
  @Output() closeForm = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<Partial<User>>();

  newUser: Partial<User> = {
    name: '',
    username: '',
    email: '',
    body: ''
  };

  onSave(): void {
    const { name, username, email, body } = this.newUser;
    if (name?.trim() && username?.trim() && email?.trim()) {
      this.addUser.emit({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        body: body?.trim() || 'No comment available'
      });
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onCancel(): void {
    this.resetForm();
    this.closeForm.emit();
  }

  private resetForm(): void {
    this.newUser = { name: '', username: '', email: '', body: '' };
  }
}
