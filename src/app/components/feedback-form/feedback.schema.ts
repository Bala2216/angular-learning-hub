export const feedbackSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      pattern: '^[A-Z][a-zA-Z_ ]*$',
      description: 'Must start with a capital letter and contain only letters, underscores, or spaces.'
    },
    phone: {
      type: 'string',
      title: 'Phone',
      pattern: '^[1-9][0-9]{9}$',
      description: 'Must be a 10-digit number starting with a non-zero digit.'
    },
    date: {
      type: 'string',
      title: 'Date',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      description: 'Must be in YYYY-MM-DD format.'
    },
    comments: {
      type: 'string',
      title: 'Comments'
    }
  },
  required: ['name', 'phone', 'date']
};

export const feedbackUISchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/name' },
    { type: 'Control', scope: '#/properties/phone' },
    { type: 'Control', scope: '#/properties/date' },
    { type: 'Control', scope: '#/properties/comments' }
  ]
};
