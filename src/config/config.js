export const configuration = [
  { type: 'input', label: 'Start', description: 'Start of the process' },
  { type: 'email', label: 'Email', description: 'End of the process' },
  {
    type: 'default',
    label: 'Send Email',
    description: 'Send notification email',
  },
  { type: 'if', label: 'Conditional Check', description: 'Check condition' },
  { type: 'output', label: 'Stop', description: 'End of the process' },
];
