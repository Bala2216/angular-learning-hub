import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, UserlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Lifecyclehook';
  users: { name: string; phone: string; age: string }[] = [];
  user = {
    name: '',
    phone: '',
    age: '',
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Check if the form is valid before processing
      console.log('Form submitted:', form.value);
      this.users.push({ ...this.user });
      this.user = {
        name: '',
        phone: '',
        age: '',
      };
      console.log('User added:', this.users);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
