import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonFormsControl } from '@jsonforms/angular';

@Component({
  selector: 'app-textbox-renderer',
  template: `
    <div [ngClass]="textboxClass">
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>{{ label }}</mat-label>
        <input
          matInput
          [type]="inputType"
          [value]="data ?? ''"
          (input)="handleInput($event)"
          [disabled]="!enabled"
        />
      </mat-form-field>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule]
})
export class TextboxRendererComponent extends JsonFormsControl {
  get inputType(): string {
    // Use schema format for input type, default to 'text'
    return this.scopedSchema.format === 'email' ? 'email' : 'text';
  }

  get textboxClass(): string {
    return this.uischema.options?.['classNames'] || '';
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange({ path: this.path, value });
  }

  
}