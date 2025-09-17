import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonFormsModule } from '@jsonforms/angular';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { ErrorObject } from 'ajv';

@Component({
  selector: 'app-json-forms-feedback-component',
  imports: [FormsModule, CommonModule, JsonFormsModule],
  templateUrl: './json-forms-feedback-component.html',
  styleUrl: './json-forms-feedback-component.css'
})
export class JsonFormsFeedbackComponent {

  data = {
    revieweeName: 'Alex Johnson',
    department: 'Engineering',
    areasOfImprovement: [
      {
        area: 'Collaboration',
        details: 'Needs to improve communication with other teams.'
      }
    ]
  };

  schema = {
    "type": "object",
    "title": "Employee Feedback Form",
    "properties": {
      "revieweeName": {
        "type": "string",
        "title": "Employee Name",
        "minLength": 3
      },
      "department": {
        "type": "string",
        "title": "Department",
        "enum": ["Sales", "Engineering", "Marketing", "Human Resources", "Finance"]
      },
      "overallRating": {
        "type": "number",
        "title": "Overall Performance Rating",
        "minimum": 1,
        "maximum": 5
      },
      "areasOfImprovement": {
        "type": "array",
        "title": "Areas of Improvement",
        "description": "List specific areas where the employee can improve.",
        "items": {
          "type": "object",
          "properties": {
            "area": {
              "type": "string",
              "title": "Focus Area",
              "enum": ["Communication", "Technical Skills", "Time Management", "Collaboration"]
            },
            "details": {
              "type": "string",
              "title": "Comments",
              "options": {
                "multi": true
              },
              "maxLength": 300
            }
          },
          "required": ["area", "details"]
        }
      }
    },
    "required": ["revieweeName", "department", "overallRating"]
  };

  // 3. UI Schema: Controls the layout of the form.
  uischema = {
    "type": "HorizontalLayout",
    "elements": [
      {
        "type": "Group",
        "label": "Employee Details",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/revieweeName"
          },
          {
            "type": "Control",
            "scope": "#/properties/department"
          }
        ]
      },
      {
        "type": "Group",
        "label": "Performance Evaluation",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/overallRating"
          },
          {
            "type": "Control",
            "scope": "#/properties/areasOfImprovement"
          }
        ]
      }
    ]
  };


  renderers = angularMaterialRenderers;

  submittedForm: any = null;

  errors: ErrorObject[] = [];

  onSubmit () {
    if (this.errors.length > 0) {
      alert('Form has errors. Please fix them before submitting.');
      return;
    }
    this.submittedForm = this.data;
    console.log('Submitted Feedback:', this.submittedForm);
  }

  onErrors(errors: ErrorObject[]) {
    this.errors = errors;
  }

}
