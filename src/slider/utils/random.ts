export function getRandomString() {
  return  Math.random().toString(36).substring(2, 15);
}

export function getRandomValueFromArray<T = string>(value: T[] | T) {
  if (Array.isArray(value)) {
    const randomIdx = ~~(Math.random() * value.length);
    return value[randomIdx] as T;
  }

  return value;
}
