export type MapOfStringArray = {
  [key: string]: string[];
};

export const isStringArray = (obj: unknown): obj is string[] =>
  Array.isArray(obj) && obj.every((item) => typeof item === "string");

export const isMapOfStringArray = (obj: unknown): obj is MapOfStringArray =>
  typeof obj === "object" &&
  obj !== null &&
  Object.values(obj).every(isStringArray);

export const flattenStringArray = (obj: MapOfStringArray): string[] => {
  const vals = Object.values(obj);

  let result: string[] = [];
  for (let arr of vals) {
    result = result.concat(arr);
  }

  return result;
};
