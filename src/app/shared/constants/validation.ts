export const Regex = {
  IsValidEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  HasLetter: /\p{L}/iu,
  HasFirstLetter: /^\p{L}/iu,
  HasDigit: /[0-9]/,
  HasSpecial: /[!@#$%^&*]/,
  HasNoEdgeSpaces: /(^\S.*\S$)|(^\S$)/,
  HasNoSpaces: /^\S+$/,
} as const;

export const ValidationMessage = {
  Required: 'Field is required',
  FirstLetter: 'Start with letter',
  NeedLetter: 'Need a letter',
  NeedDigit: 'Need a digit',
  NeedSpecial: 'Need a special (!@#$%^&*)',
  NoEdgeSpaces: 'No spaces at ends',
  NoSpaces: 'Spaces not allowed',
  InvalidEmail: 'Invalid email (e.g., login@domain.com)',
  PasswordMismatch: 'Passwords mismatch',
  MinLen: (len: number) => `Min ${len} chars`,
  MaxLen: (len: number) => `Max ${len} chars`,
} as const;
