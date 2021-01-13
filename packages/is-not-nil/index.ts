/**
 * Type-checks if a value is not nil (`null` or `undefined`).
 */
export default function isNotNil<T>(val: T | undefined | null): val is T {
  return !!val;
}
