// export const schema = {
//   type: 'object',
//   properties: {
//     employee: {
//       type: 'array',
//       items: {
//         type: 'object',
//         properties: {
//           name: { type: 'string' },
//           age: { type: 'integer' },
//           phoneNumber: { type: 'string', pattern: '^\\d{10}$' },
//         },
//         required: ['name', 'age', 'phoneNumber'],
//       },
//     },
//   },
// };

// export const uischema = {
//   type: 'Control',
//   scope: '#/properties/employee',
//   options: {
//     detail: {
//       type: 'HorizontalLayout',
//       elements: [
//         { type: 'Control', scope: '#/properties/name' },
//         { type: 'Control', scope: '#/properties/age' },
//         { type: 'Control', scope: '#/properties/phoneNumber' },
//       ],
//     },
//   },
// };

export const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer' },
    phoneNumber: { type: 'string', pattern: '^\\d{10}$' },
  },
  required: ['name', 'age', 'phoneNumber'],
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/name' },
    { type: 'Control', scope: '#/properties/age' },
    { type: 'Control', scope: '#/properties/phoneNumber' },
  ],
};

