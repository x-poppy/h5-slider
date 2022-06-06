export function distance(a: number, b: number): number {
  return Math.abs(a - b);
}

export function isCloseTo(a: number, b: number, threshold: number = 0) {
  if (a === b) {
    return true;
  }
  const distance =  Math.abs(a - b);
  return distance - threshold <= 0;
}
