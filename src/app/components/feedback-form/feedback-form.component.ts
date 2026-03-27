import { Component } from '@angular/core';
import { feedbackSchema, feedbackUISchema } from './feedback.schema';
import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  schema = feedbackSchema;
  uiSchema = feedbackUISchema;
  renderers = angularMaterialRenderers;

  data: any = {
    name: '',
    phone: '',
    date: '',
    comments: ''
  };

  sanitizePattern(pattern: string): string {
    return pattern.replace(/\\\\/g, '\\');
  }

  submitFeedback() {
    const name = (this.data?.name || '').trim();
    const phone = (this.data?.phone || '').trim();
    const date = (this.data?.date || '').trim();

    const namePattern = new RegExp(this.sanitizePattern(this.schema.properties.name.pattern));
    const phonePattern = new RegExp(this.sanitizePattern(this.schema.properties.phone.pattern));
    const datePattern = new RegExp(this.sanitizePattern(this.schema.properties.date.pattern));

    const isValid =
      namePattern.test(name) &&
      phonePattern.test(phone) &&
      datePattern.test(date);

    if (isValid) {
      alert(`Feedback submitted by ${name}`);
    } else {
      alert('Please correct the feedback form before submitting.');
    }
  }
}
