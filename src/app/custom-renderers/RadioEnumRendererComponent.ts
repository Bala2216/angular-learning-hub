import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
// import { RendererService, rankWith, isEnumControl } from '@jsonforms/core';

@Component({
  selector: 'app-radio-enum-renderer',
  template: `
      <label style="font-weight: 500; margin-bottom: 8px; display: block;">{{ label }}</label>
      <mat-radio-group
        [value]="data"
        (change)="handleInput($event.value)"
        [disabled]="!enabled"
      >
        <mat-radio-button *ngFor="let option of options" [value]="option">
          {{ option }}
        </mat-radio-button>
      </mat-radio-group>
  `,
  standalone: true,
  imports: [CommonModule, MatRadioModule
    // Angular Material modules
    // Add MatFormFieldModule, MatRadioModule, CommonModule if needed
  ]
})
export class RadioEnumRendererComponent extends JsonFormsControl {
  get options(): string[] {
    return this.scopedSchema.enum || [];
  }

  handleInput(value: string) {
    this.onChange({ path: this.path, value });
  }

}