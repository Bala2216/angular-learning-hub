export const employeeSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
    jobTitle: { type: 'string' },
    department: { type: 'string' },
    experience: { type: 'integer' },
    salary: { type: 'number' },
    isActive: { type: 'boolean' },
    gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
    age: { type: 'integer' },
  },
  required: ['firstName', 'lastName', 'email', 'jobTitle'],
};
