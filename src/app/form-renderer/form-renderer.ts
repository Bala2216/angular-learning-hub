import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormSchema } from '../models/form.model';
import { FormDataService } from '../services/form-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormRendererComponent implements OnInit {
  formSchema!: FormSchema;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.formSchema = this.formDataService.getFormSchema();
    this.createForm();
  }

  createForm(): void {
    const group: any = {};
    this.formSchema.formControls.forEach((control) => {
      const validators = [];
      if (control.validators.required) validators.push(Validators.required);
      if (control.validators.minLength)
        validators.push(Validators.minLength(control.validators.minLength));
      if (control.validators.maxLength)
        validators.push(Validators.maxLength(control.validators.maxLength));
      if (control.validators.email) validators.push(Validators.email);
      if (control.validators.pattern)
        validators.push(Validators.pattern(control.validators.pattern));
      group[control.name] = ['', validators];
    });
    this.formGroup = this.fb.group(group);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form Submitted', this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onReset() {
    this.formGroup.reset();
  }
}
