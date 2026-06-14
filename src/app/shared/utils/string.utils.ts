export const isString = (v: unknown): v is string => {
  return typeof v === 'string';
};

export const capitalize = (str: string) => {
  return str.replace(/^(.)/, (_, s) => `${s}`.toLocaleUpperCase());
};
