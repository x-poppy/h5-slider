import { isPlainObject } from "./typeDetect";

export function filterObjectByMatcher(
    value: Record<string, any>, 
    matcher: Record<string, boolean> | string | string[] | boolean | null | undefined,
    whiteListMode: boolean) {

  const isWhiteListMode = whiteListMode ?? true;

  if (!matcher) {
    if (isWhiteListMode) {
      return {};
    } else {
      return value;
    }
  }

  if (typeof matcher === 'boolean') {
    return value;
  }

  if (isPlainObject(matcher)) {
    return Object.keys(value).filter(key => {
      const isMatch = !!((matcher as Record<string, boolean>)[key]);
      if (isWhiteListMode) {
        return isMatch;
      } else {
        return !isMatch;
      }
    }).reduce((map, key) => {
      map[key] = value[key];
      return map;
    }, {} as Record<string, any>)
  } else if (Array.isArray(matcher) || typeof matcher === 'string') {
    const matchers = Array.isArray(matcher) ? matcher : [matcher];
    const regExps = matchers
    .filter(matcherItem => {
      if (typeof matcherItem !== 'string') {
        return false;
      }
      matcherItem = matcherItem.trim();
      if (matcherItem.length === 0) {
        return false;
      }
      return true;
    })
    .map(matcherItem => {
      return new RegExp(matcherItem)
    });
    if (regExps.length === 0) {
      return {};
    }
    return Object.keys(value).filter(key => {
      const isMatch = regExps.some(regExp => regExp.test(key));
      if (isWhiteListMode) {
        return isMatch;
      } else {
        return !isMatch;
      }
    }).reduce((map, key) => {
      map[key] = value[key];
      return map;
    }, {} as Record<string, any>)
  }
}

export function convertStringToBooleanMap(value: string | null, separator = ','):Record<string, boolean> {
  if (!value) {
    return {};
  }
  return value.split(separator)
  .reduce<Record<string, boolean>>((map, item: string) => {
    item = item.trim();
    if (item) {
      map[item] = true;
    }
    return map;
  }, {});
}

export function covertBooleanMapToString(map: Record<string, boolean> | null, separator = ',') {
  if (!map) {
    return '';
  }
  return Object.keys(map).filter(key => !!map[key]).join(separator);
}
