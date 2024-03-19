export const configuration = [
  { type: 'input', label: 'Start', description: 'Start of the process' },
  { type: 'email', label: 'Email', description: 'End of the process' },
  {
    type: 'conditional',
    label: 'Conditional',
    description: 'Conditional block',
  },
  {
    type: 'default',
    label: 'Default',
    description: 'Default',
  },
  {
    type: 'sms',
    label: 'SMS',
    description: 'SMS',
  },
  { type: 'output', label: 'Stop', description: 'End of the process' },
];
