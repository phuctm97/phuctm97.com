import { Record, isObject } from "~/utils/lang/obj";

export const isStringArray = (obj: unknown): obj is string[] =>
  Array.isArray(obj) && obj.every((item) => typeof item === "string");

export const isRecordOfStringArray = (obj: unknown): obj is Record<string[]> =>
  isObject(obj) && Object.values(obj).every(isStringArray);

export const flattenStringArray = (obj: Record<string[]>): string[] =>
  Object.values(obj).reduce((acc, item) => acc.concat(item), []);
