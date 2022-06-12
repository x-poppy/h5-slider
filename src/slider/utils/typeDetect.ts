export function isReactElement(val: any) {
  if (typeof val === 'object' && '$$typeof' in val) {
    return true;
  }

  return false;
}

export function isPlainValue(val: any) {
  return typeof val === 'string' || val === 'number'  || val === null || val === undefined;
}

export function isDebuggerValue(val: any) {
  return val === 'debugger';
}

export function isPlainObject(val: any) {
  return val !== null && typeof val === 'object' && Object.getPrototypeOf(val) === Object.prototype
}

export function isComponentSchema(val: any) {
  if (isPlainObject(val) && 'type' in val && typeof val.type === 'string') {
    return true;
  }
  return false;
}

