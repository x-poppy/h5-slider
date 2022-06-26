import MobileDetect from 'mobile-detect';
import disableDevtool from 'disable-devtool';
import { SliderSchema } from '../types/Schema';
import { match } from "./string";

const InvalidErrorMessage = 'EnviromentNotSupport';

export function isEnviromentNotSupportError(error: any): boolean {
  if (error && 'message' in error && error.message === InvalidErrorMessage) {
    return true;
  }
  return false;
}

export function validateEnviroments(config: Record<string, any>) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (config['__SkipEnviromentsValidation__']) {
    return;
  }

  disableDevtool({
    interval: 1000,
    detectors: [-1, 0, 2],
    ondevtoolopen() {
      window.location.href = 'about:blank';
    }
  });

  function throwEnviromentsError() {
    throw new Error(InvalidErrorMessage);
  }

  if (window.top !== window) {
    throwEnviromentsError();
  }

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile() || mobileDetect.tablet();
  if (!isMobile) {
    throwEnviromentsError();
  }
}

export function validateScurity(schema: SliderSchema) {
  const userAgentMatcher = schema.security?.userAgentMatcher;
  if (userAgentMatcher) {
    if (!match(window.navigator.userAgent, userAgentMatcher, true)) {
      throw(new Error("Invalid UserAgent"));
    }
  }

  if (schema.security?.searchMatcher) {
    const queries: string[] = [];
    if (Array.isArray(schema.security?.searchMatcher)) {
      queries.push(...schema.security.searchMatcher);
    } else if (typeof schema.security?.searchMatcher === 'string') {
      queries.push(schema.security.searchMatcher);
    }

    const searchParams = new URLSearchParams(window.location.search);
    queries.forEach((key) => {
      if (!searchParams.has(key)) {
        throw(new Error("Invalid Search Params " + key));
      }
    })
  }
}
