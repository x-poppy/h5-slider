export function filterObjectByKeys(value: Record<string, any>, matcher?: string | string[] | null) {
  if (matcher === null) {
    return {};
  }

  if (!matcher) {
    return {
      ...value
    };
  }

  const regExps =(Array.isArray(matcher) ? matcher : [ matcher])
    .filter(Boolean)
    .map(item => new RegExp(item));
  
  return Object.keys(value).filter(key => {
    return regExps.some(regExp => regExp.test(key));
  }).reduce((map, key) => {
    map[key] = value[key];
    return map;
  }, {} as Record<string, any>)
}