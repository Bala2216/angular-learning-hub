import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.scss']
})
export class SurveyCreatorComponent implements OnInit {
  surveyForm: FormGroup;
  previewMode = false;
  feedback = {
    name: '',
    comments: ''
  };
  jsonFormSchema = [
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Age', type: 'number', name: 'age' }
  ];

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const savedSurvey = localStorage.getItem('surveyData');
    if (savedSurvey) {
      this.surveyForm.setValue(JSON.parse(savedSurvey));
    }
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(type: string) {
    const question = this.fb.group({
      type: [type],
      label: ['', Validators.required],
      options: this.fb.array(type === 'multiple' ? [''] : [])
    });
    this.questions.push(question);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }

  saveSurvey() {
    localStorage.setItem('surveyData', JSON.stringify(this.surveyForm.value));
    alert('Survey saved to local storage!');
  }

  submitFeedback() {
    alert(`Feedback submitted by ${this.feedback.name}`);
  }
}
