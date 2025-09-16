import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchTextChange.emit(value);
  }
}
