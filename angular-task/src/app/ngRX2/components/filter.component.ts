import { Component, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Search by name</mat-label>
      <input matInput (input)="onInput($event)" />
    </mat-form-field>
  `,
})
export class FilterComponent {
  @Output() filter = new EventEmitter<string>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter.emit(input.value);
  }
}
