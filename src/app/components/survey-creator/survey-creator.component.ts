import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.scss'],
})
export class SurveyCreatorComponent implements OnInit {
  surveyForm: FormGroup;
  selectedRole = '';
  @ViewChild('surveyTitleInput', { static: false }) surveyTitleInput?: ElementRef;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.selectedRole = this.roleService.roleSignalValue;

    const savedSurvey = localStorage.getItem('surveyData');
    if (savedSurvey) {
      const parsed = JSON.parse(savedSurvey);
      if (parsed.title && parsed.title.trim() !== '') {
        this.surveyForm.setValue(parsed);
      } else {
        localStorage.removeItem('surveyData');
      }
    }

    setTimeout(() => {
      this.surveyTitleInput?.nativeElement.focus();
    }, 0);
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
    this.surveyTitleInput?.nativeElement.focus();
  }

  onRoleChange(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.selectedRole = selectedRole;
    this.roleService.setRole(selectedRole);
  }
}