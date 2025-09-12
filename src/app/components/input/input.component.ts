import { Component, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();

  private inputSubject = new Subject<string>();

  constructor() {
    this.inputSubject.pipe(debounceTime(300)).subscribe(value => {
      this.searchTextChange.emit(value);
    });
  }

  onInputChange(value: string) {
    this.inputSubject.next(value);
  }
}
