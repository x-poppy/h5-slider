import {getProperty, hasProperty} from 'dot-prop';

const referenceExpressReg = /\${[^}{]*?}/g;

export function isReferenceExpress(val: any) {
  if (typeof val === 'string') {
    if (val.startsWith('${') && val.endsWith('}')) {
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

    const isFullReference = val.startsWith('${') && val.endsWith('}');
    if (isFullReference) {
      const referenceVarName = val.slice(2, -1);
      if (referenceVarName.length > 0 && hasProperty(scopeRefs, referenceVarName)) {
        return getProperty(scopeRefs, referenceVarName);
      }
      return val;
    }

    return val.replaceAll(referenceExpressReg, (matchStr) => {
      const referenceVarName = matchStr.slice(2, -1);
      if (referenceVarName.length > 0 && hasProperty(scopeRefs, referenceVarName)) {
        return getProperty(scopeRefs, referenceVarName);
      }
      return matchStr;
    });
  }
}
