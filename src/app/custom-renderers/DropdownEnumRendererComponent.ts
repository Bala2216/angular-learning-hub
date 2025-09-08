import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonFormsControl } from '@jsonforms/angular';

@Component({
  selector: 'app-dropdown-enum-renderer',
  template: `
    <div [ngClass]="dropdownClass">
      <mat-form-field appearance="outline" style="width:30%;">
        <mat-label>{{ label }}</mat-label>
        <mat-select
          [value]="data"
          (selectionChange)="handleInput($event.value)"
          [disabled]="!enabled"
        >
          <mat-option *ngFor="let option of options" [value]="option">
            {{ option }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule]
})
export class DropdownEnumRendererComponent extends JsonFormsControl {
  get options(): string[] {
    return this.scopedSchema.enum || [];
  }

  get dropdownClass(): string {
    // Use classNames from uischema.options if provided
    return this.uischema.options?.['classNames'] || '';
  }

  handleInput(value: string) {
    this.onChange({ path: this.path, value });
    console.log('Dropdown changed:', "event", "value", value);
  }
}