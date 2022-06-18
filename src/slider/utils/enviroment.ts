import MobileDetect from 'mobile-detect';
import disableDevtool from 'disable-devtool';

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
