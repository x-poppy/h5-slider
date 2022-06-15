import {getProperty, hasProperty} from 'dot-prop';
import { getRandomValueFromArray } from './random';

const referenceExpressReg = /\${[^}{]*?}/g;

export function isReferenceVariable(val: any) {
  if (typeof val === 'string') {
    if (val.startsWith('${') && val.endsWith('}')) {
      return true;
    }
  }
  return false;
}

export function getNameReferenceVariable(val: any) {
  if (!isReferenceVariable(val)) {
    return null;
  }
  const results = (val as string).slice(2, -1);
  if (results.length === 0) {
    return null;
  }
  return results;
}

export function getReferenceVariableValue(
  value: any, 
  defaultValue: any, 
  reader?: (key: string) => any): any {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof defaultValue === 'boolean') {
    if (typeof value === 'boolean') {
      return value;
    } else if (Array.isArray(value)) {
      return value.every((item) => {
        return Boolean(getReferenceVariableValue(item, defaultValue, reader));
      })
    } if (isReferenceVariable(value)) {
      const variableNme = getNameReferenceVariable(value);
      if (!variableNme || !reader) {
        return defaultValue;
      }
      return !!(reader(variableNme) ?? defaultValue);
    } else {
      return !!value;
    }
  } else if (defaultValue === 'string') {
    if (Array.isArray(value)) {
      const results = value.map((item) => getReferenceVariableValue(item, defaultValue, reader));
      return getRandomValueFromArray(results);
    } else if (isReferenceVariable(value)) {
      const variableNme = getNameReferenceVariable(value);
      if (!variableNme || !reader) {
        return defaultValue;
      }
      return (reader(variableNme) ?? defaultValue) + '';
    }
    return value + '';
  } else if(typeof defaultValue !== typeof value) {
    if (isReferenceVariable(value)) {
      const variableNme = getNameReferenceVariable(value);
      if (!variableNme || !reader) {
        return defaultValue;
      }
      return reader(variableNme) ?? defaultValue;
    }
    return defaultValue;
  } else {
    if (isReferenceVariable(value)) {
      const variableNme = getNameReferenceVariable(value);
      if (!variableNme || !reader) {
        return defaultValue;
      }
      return reader(variableNme) ?? defaultValue;
    }

    return value; 
  }
}

export function isReferenceExpress(val: any) {
  if (typeof val === 'string') {
    if (isReferenceVariable(val)) {
      return true;
    }
    const results = val.match(referenceExpressReg);
    if (!results) {
      return false;
    }
    return true;
  }
  return false;
}

export function getReferenceExpressValue(val: any, scopeRefs?: Record<string, any>): any {
  if (typeof val === 'string') {
    if (!scopeRefs) {
      return val;
    }
    
    if (!isReferenceExpress(val)) {
      return val;
    }

    if (isReferenceVariable(val)) {
      let variableName = getNameReferenceVariable(val);
      if (variableName) {
        // todo for ${${xxx}} cause
        const stillIsRef = isReferenceVariable(variableName);
        if (stillIsRef) {
          variableName = getNameReferenceVariable(variableName);
        }

        if (variableName && hasProperty(scopeRefs, variableName)) {
          if (!stillIsRef) {
            return getProperty(scopeRefs, variableName);
          } else {
            const result = getProperty(scopeRefs, variableName);
            if (typeof result === 'string' || typeof result === 'number') {
              return '${' + result + '}';
            } else {
              return result;
            }
          }
        }
      }

      if (variableName && hasProperty(scopeRefs, variableName)) {
        return getProperty(scopeRefs, variableName);
      }
      return val;
    }

    return val.replaceAll(referenceExpressReg, (matchStr) => {
      if (isReferenceVariable(matchStr)) {
        const variableName = getNameReferenceVariable(matchStr);
        if (variableName && hasProperty(scopeRefs, variableName)) {
          return getProperty(scopeRefs, variableName);
        }
      }
      return matchStr;
    });
  }
}
