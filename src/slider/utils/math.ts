export function distance(a: number, b: number): number {
  return Math.abs(a - b);
}

export function isCloseTo(a: number, b: number, threshold = 0) {
  if (a === b) {
    return true;
  }
  return Math.abs(a - b) - threshold <= 0;
}

export function shuffle(value: any[]) {
  if (!value || value.length === 1) {
    return value;
  }

  return value.sort(() => Math.random() - 0.5);
}
