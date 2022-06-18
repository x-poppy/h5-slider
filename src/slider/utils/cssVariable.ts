const referenceExpressReg = /var\(--.+\);/g

export function replaceTextByVariables(val: string, vars?: Record<string, any>) {
  if (!vars) {
    return val;
  }
  return val.replaceAll(referenceExpressReg, (matchStr) => {
    return matchStr.slice(4, -2)
  });
}
