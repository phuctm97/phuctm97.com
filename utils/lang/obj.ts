export type Record<T = unknown> = {
  [key: string]: T;
};

export const notNil = <T>(val: T | undefined | null): val is T => !!val;

export const isObject = (val: unknown): val is Record =>
  typeof val === "object" && val !== null;

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> =>
  keys.reduce((out, key) => {
    if (obj && obj.hasOwnProperty(key)) out[key] = obj[key];
    return out;
  }, {} as T);
