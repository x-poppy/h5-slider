import MobileDetect from 'mobile-detect';
import disableDevtool from 'disable-devtool';

export function validateEnviroments(config: Record<string, any>) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (config['__SkipEnviromentsValidation__']) {
    return;
  }

  disableDevtool({
    interval: 1000,
    detectors: [-1, 0, 2]
  });

  function throwEnviromentsError() {
    throw new Error('Invalid Enviroments!');
  }

  if (window.top !== window) {
    throwEnviromentsError();
  }

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile() || mobileDetect.tablet();
  if (!isMobile) {
    throw new Error('Invalid Enviroments!');
  }
}
