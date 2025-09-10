import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator, phoneValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-directives',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './directives.html',
  styleUrl: './directives.css',
})
export class Directives {
  //Structral Directives
  isLoggedIn: boolean = true;
  role: string = 'admin';
  products = [
    {
      id: 1,
      name: 'book',
    },
    {
      id: 2,
      name: 'pen',
    },
    {
      id: 3,
      name: 'bag',
    },
  ];
  status: string = 'pending'; //pending, success, failed

  // Attribute Directives
  // ngClass
  isActive: boolean = true;
  isDisabled: boolean = true;
  isSuccess: boolean = true;
  // isError:boolean = false;
  currentClass = 'highlight';

  //ngStyle
  textColor: string = 'blue';
  isError = true;
  fontSize = 20;
  myStyles = {
    color: 'purple',
    'font-weight': 'bold',
    'background-color': 'lightyellow',
  };
  isHighlighted = false;
  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  form!: FormGroup;
  ngOnInit() {

    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
    });
  }

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    } else {
      console.log('Form Invalid');
    }
  }
}
