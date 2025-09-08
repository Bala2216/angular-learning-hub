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

  data: any = {
    name: '',
    phone: '',
    date: '',
    comments: ''
  };

  renderers = angularMaterialRenderers;

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

    console.log('Name:', name, 'Valid:', namePattern.test(name));
    console.log('Phone:', phone, 'Valid:', phonePattern.test(phone));
    console.log('Date:', date, 'Valid:', datePattern.test(date));

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
