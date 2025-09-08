import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-adduser',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss',
})
export class AdduserComponent {
  // Use @Output() to emit an event when a user is submitted
  @Output() userAdded = new EventEmitter<{
    name: string;
    phone: string;
    age: string;
    status: string; // Add status to the emitted event
  }>();

  // user = {
  //   name: '',
  //   phone: '',
  //   age: '',
  // };

  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     // Emit the user data to the parent component
  //     this.userAdded.emit({ ...this.user });

  //     // Reset the form after submission
  //     form.resetForm();
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      status: ['active', Validators.required],
    });
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get age() {
    return this.userForm.get('age');
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userAdded.emit(this.userForm.value);
      this.userForm.reset({ status: 'active' });
    }
  }
}
