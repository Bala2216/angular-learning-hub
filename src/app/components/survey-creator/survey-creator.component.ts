import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.scss'],
})
export class SurveyCreatorComponent implements OnInit {
  surveyForm: FormGroup;
  @ViewChild('surveyTitleInput') surveyTitleInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const savedSurvey = localStorage.getItem('surveyData');
    if (savedSurvey) {
      const parsed = JSON.parse(savedSurvey);
      if (parsed.title && parsed.title.trim() !== '') {
        this.surveyForm.setValue(parsed);
      } else {
        localStorage.removeItem('surveyData'); // Clear invalid data
      }
    }
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(type: string) {
    const question = this.fb.group({
      type: [type],
      label: ['', Validators.required],
      options: this.fb.array(type === 'multiple' ? [''] : []),
    });
    this.questions.push(question);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  saveSurvey() {
    const title = this.surveyForm.get('title')?.value;
    if (title && title.trim() !== '') {
      localStorage.setItem('surveyData', JSON.stringify(this.surveyForm.value));
      alert('Survey saved to local storage!');
    } else {
      localStorage.removeItem('surveyData');
      alert('Survey title is empty. Data not saved.');
    }
  }

  clearSurvey() {
    this.surveyForm.reset();
    this.questions.clear();
    localStorage.removeItem('surveyData');
  }
}
