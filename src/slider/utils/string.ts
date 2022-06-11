export function trimPrefix(val: string, prefix?: string) {
  if (!prefix) {
    return val;
  }

  if (!val) {
    return val;
  }

  if (val.startsWith(prefix)) {
    return val.substring(prefix.length);
  }

  return val;
}
