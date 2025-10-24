export const jobSchema = {
  type: 'object',
  properties: {
    position: { type: 'string' },
    department: { type: 'string' },
  },
};

export const jobUISchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/position' },
    { type: 'Control', scope: '#/properties/department' },
  ],
};