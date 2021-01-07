export const isStringArray = (obj: any): obj is string[] => {
  if (!Array.isArray(obj)) return false;

  for (let item of obj) {
    if (typeof item !== "string") return false;
  }

  return true;
};

export type MapOfStringArray = {
  [key: string]: string[];
};

export const isMapOfStringArray = (obj: any): obj is MapOfStringArray => {
  if (typeof obj !== "object") return false;

  const vals = Object.values(obj);
  for (let val of vals) {
    if (!isStringArray(val)) return false;
  }

  return true;
};

export const flattenStringArray = (obj: MapOfStringArray): string[] => {
  const vals = Object.values(obj);

  let result: string[] = [];
  for (let arr of vals) {
    result = result.concat(arr);
  }

  return result;
};
