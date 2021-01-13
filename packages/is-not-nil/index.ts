export default function <T>(val: T | undefined | null): val is T {
  return !!val;
}
