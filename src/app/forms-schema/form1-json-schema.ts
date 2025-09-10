export const jsonSchema = {
    type: 'object',
    properties: {
        fullName: { type: 'string', minLength: 3 },
        age: { type: 'number', minimum: 0 },
        gender: {
            type: 'string',
            enum: ['Male', 'Female', 'Other']
        },
        subscribe: { type: 'boolean' },
        birthDate: { type: 'string', format: 'date' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['fullName', 'email', 'password']
};

export const uiSchema = {
  type: 'HorizontalLayout',
  elements: [
    { type: 'Control', label: 'Full Name', scope: '#/properties/fullName' },
    { type: 'Control', label: 'Age', scope: '#/properties/age' },
    {
      type: 'Control',
      label: 'Gender',
      scope: '#/properties/gender',
      options: { format: 'radio' }
    },
    { type: 'Control', label: 'Subscribe to newsletter', scope: '#/properties/subscribe' },
    { type: 'Control', label: 'Birth Date', scope: '#/properties/birthDate' },
    { type: 'Control', label: 'Email Address', scope: '#/properties/email' },
    { type: 'Control', label: 'Password', scope: '#/properties/password' }
  ]
};

import Ajv, { FormatDefinition } from 'ajv';

export function createAjvWithCustomFormats(): Ajv {
  const ajv = new Ajv();

  const lettersOnlyFormat: FormatDefinition<string> = {
    type: 'string',
    validate: (name: string): boolean => /^[A-Za-z\s]+$/.test(name)
  };
  ajv.addFormat('lettersOnly', lettersOnlyFormat);

  const strongPasswordFormat: FormatDefinition<string> = {
    type: 'string',
    validate: (password: string): boolean =>
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/.test(password)
  };
  ajv.addFormat('strongPassword', strongPasswordFormat);

  return ajv;
}
