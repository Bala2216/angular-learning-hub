export const personalSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['firstName'],
};

export const personalUISchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/firstName' },
    { type: 'Control', scope: '#/properties/lastName' },
  ],
};
