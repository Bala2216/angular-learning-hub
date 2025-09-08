import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  imports: [FormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss',
})
export class AdduserComponent {
  // Use @Output() to emit an event when a user is submitted
  @Output() userAdded = new EventEmitter<{
    name: string;
    phone: string;
    age: string;
  }>();

  user = {
    name: '',
    phone: '',
    age: '',
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Emit the user data to the parent component
      this.userAdded.emit({ ...this.user });

      // Reset the form after submission
      form.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
