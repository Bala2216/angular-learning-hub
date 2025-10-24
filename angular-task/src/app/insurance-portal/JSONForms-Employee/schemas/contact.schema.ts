export const contactSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
  },
  required: ['email'],
};

export const contactUISchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/email' },
    { type: 'Control', scope: '#/properties/phone' },
  ],
};
