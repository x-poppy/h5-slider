export function isEffectElement(val: any) {
  if (val !== null && typeof val === 'object' && '$$effect' in val && !!(val.$$effect)) {
    return true;
  }

  return false;
}

export function isReactElement(val: any) {
  if (val !== null && typeof val === 'object' && '$$typeof' in val && !!(val.$$typeof)) {
    return true;
  }

  return false;
}

export function isReactOrEffectElement(val: any) {
  return isReactElement(val) || isEffectElement(val);
}

export function isPlainValue(val: any) {
  return typeof val === 'string' || 
    typeof val === 'number'  || 
    val === null || 
    val === undefined;
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

