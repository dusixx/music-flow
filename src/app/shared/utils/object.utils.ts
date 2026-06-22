export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj != null && typeof obj === 'object';
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every((key) => Object.hasOwn(obj, key));
};
