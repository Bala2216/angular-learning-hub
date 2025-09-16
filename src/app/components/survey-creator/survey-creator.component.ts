import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import {
  BehaviorSubject,
  Subject,
  fromEvent,
  combineLatest
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  takeUntil,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'app-survey-creator',
  templateUrl: './survey-creator.component.html',
  styleUrls: ['./survey-creator.component.scss']
})
export class SurveyCreatorComponent implements OnInit, OnDestroy {
  surveyForm!: FormGroup;
  selectedRole = '';

  private destroy$ = new Subject<void>();
  private formState$!: BehaviorSubject<FormGroup>;
  private role$ = new BehaviorSubject<string>('');
  private titleChanges$ = new Subject<string>();

  @ViewChild('surveyTitleInput', { static: false }) surveyTitleInput?: ElementRef;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    const initialForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });

    this.formState$ = new BehaviorSubject<FormGroup>(initialForm);
    this.surveyForm = initialForm;
  }

  ngOnInit(): void {
    this.selectedRole = this.roleService.roleSignalValue;
    this.role$.next(this.selectedRole);

    const savedSurvey = localStorage.getItem('surveyData');
    if (savedSurvey) {
      const parsed = JSON.parse(savedSurvey);
      if (parsed.title?.trim()) {
        this.surveyForm.setValue(parsed);
      } else {
        localStorage.removeItem('surveyData');
      }
    }

    
    fromEvent(window, 'load')
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.surveyTitleInput?.nativeElement.focus())
      )
      .subscribe();

    this.surveyForm.get('title')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(title => title.trim().length > 0),
        tap(title => {
          this.titleChanges$.next(title);
          localStorage.setItem('surveyData', JSON.stringify(this.surveyForm.value));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    combineLatest([this.role$, this.formState$])
      .pipe(
        tap(([role, form]) => {
          console.log(`Role: ${role}, Title: ${form.get('title')?.value}`);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(type: string): void {
    const question = this.fb.group({
      type: [type],
      label: ['', Validators.required],
      options: this.fb.array(type === 'multiple' ? [''] : [])
    });
    this.questions.push(question);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  saveSurvey(): void {
    const title = this.surveyForm.get('title')?.value;
    if (title?.trim()) {
      localStorage.setItem('surveyData', JSON.stringify(this.surveyForm.value));
      alert('Survey saved to local storage!');
    } else {
      localStorage.removeItem('surveyData');
      alert('Survey title is empty. Data not saved.');
    }
  }

  clearSurvey(): void {
    this.surveyForm.reset();
    this.questions.clear();
    localStorage.removeItem('surveyData');
    this.surveyTitleInput?.nativeElement.focus();
  }

  onRoleChange(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.selectedRole = selectedRole;
    this.role$.next(selectedRole);
    this.roleService.setRole(selectedRole);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
