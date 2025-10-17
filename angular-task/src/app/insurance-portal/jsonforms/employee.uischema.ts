export const personalUISchema = {
  type: 'Group',
  label: 'Personal Info',
  elements: [
    { type: 'Control', scope: '#/properties/firstName' },
    { type: 'Control', scope: '#/properties/lastName' },
    { type: 'Control', scope: '#/properties/email' },
    { type: 'Control', scope: '#/properties/phone' },
  ],
};

export const jobUISchema = {
  type: 'Group',
  label: 'Job Info',
  elements: [
    { type: 'Control', scope: '#/properties/jobTitle' },
    { type: 'Control', scope: '#/properties/department' },
    { type: 'Control', scope: '#/properties/experience' },
    { type: 'Control', scope: '#/properties/salary' },
  ],
};

export const statusUISchema = {
  type: 'Group',
  label: 'Status Info',
  elements: [
    { type: 'Control', scope: '#/properties/isActive' },
    { type: 'Control', scope: '#/properties/gender' },
    { type: 'Control', scope: '#/properties/age' },
  ],
};
