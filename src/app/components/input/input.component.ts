import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchTextChange.emit(value);
  }
}
