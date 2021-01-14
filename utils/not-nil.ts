export default function notNil<T>(val: T | undefined | null): val is T {
  return !!val;
}
