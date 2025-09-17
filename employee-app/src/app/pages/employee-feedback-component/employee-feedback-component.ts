import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import formJson from './feedback-form.json';

@Component({
  selector: 'app-employee-feedback-component',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-feedback-component.html',
  styleUrl: './employee-feedback-component.css'
})

export class EmployeeFeedbackComponent implements OnInit{
  formConfig: any = formJson;
  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const group: any = {};

    this.formConfig.fields.forEach((field: any) => {
      if(field.type === 'checkbox') {
        group[field.name] = this.fb.array([]);
      } else {
        group[field.name] = ['', field.required ? Validators.required : []];
      }
    });

    this.feedbackForm = this.fb.group(group);
  }

  onCheckboxChange(event: any, fieldName: string, value: string) {
    const formArray: FormArray = this.feedbackForm.get(fieldName) as FormArray;

    if (event.target.checked) {
      formArray.push(this.fb.control(value));
    } else {
      const index = formArray.controls.findIndex((x: { value: string; }) => x.value === value);
      if(index !== -1)
        formArray.removeAt(index);
    }
  }

  submitForm() {
    console.log(this.feedbackForm.value);
  }

}
