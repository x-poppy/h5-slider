export function trimPrefix(val: string, prefix?: string) {
  if (!prefix) {
    return val;
  }

  if (!val) {
    return val;
  }

  if (val.startsWith(prefix)) {
    return val.substring(prefix.length);
  }

  return val;
}

export function match(target: string, 
  matcher: string | string[] | boolean | undefined, 
  isAllPass: boolean) {
if (!matcher) {
  return false;
}

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
  return new RegExp(matcherItem as string)
});

if (regExps.length === 0) {
  return false;
}

if (isAllPass) {
  return regExps.every(regExp => regExp.test(target));
} else {
  return regExps.some(regExp => regExp.test(target));
}
}

