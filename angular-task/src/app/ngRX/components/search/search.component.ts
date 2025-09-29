import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  term = '';

  onInput() {
    this.search.emit(this.term);
  }
}
