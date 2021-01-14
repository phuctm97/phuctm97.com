export type Record<T = unknown> = {
  [key: string]: T;
};

export const notNil = <T>(val: T | undefined | null): val is T => !!val;

export const isObject = (val: unknown): val is object =>
  typeof val === "object" && val !== null;
