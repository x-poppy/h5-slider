interface InitialConfig {
  appDomain: string;
  mock: boolean;
  [key: string]: string | boolean | number | null;
}

const defaultInitialConfig: InitialConfig = {
  appDomain: `${window.location.protocol}//${window.location.host}`,
  mock: false,
};

let initialConfig: InitialConfig | null = null;

function getInitialConfigFromScriptElement(): InitialConfig {
  const configScriptElement = document.querySelector('[data-init-config]');
  let scriptInitConfig = null;
  if (configScriptElement && configScriptElement.innerHTML) {
    try {
      scriptInitConfig = JSON.parse(configScriptElement.innerHTML);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  return scriptInitConfig;
}

function getInitialConfigFromURLParameters(): InitialConfig {
  const searchParams = new URLSearchParams(window.location.search);
  const searchParamsInitConfig = {} as InitialConfig;
  // eslint-disable-next-line prefer-const
  for (let [key, val] of searchParams) {
    val = val.toLowerCase();
    if (val === 'true' || val === '') {
      searchParamsInitConfig[key] = true;
    } else if (val === 'false') {
      searchParamsInitConfig[key] = false;
    } else if (Number.isInteger(Number(val))) {
      searchParamsInitConfig[key] = Number(val);
    } else {
      searchParamsInitConfig[key] = decodeURIComponent(val);
    }
  }

  return searchParamsInitConfig;
}

function getInitialConfigFromWindow(): InitialConfig {
  if ('initialConfig' in window) {
    return (window as unknown as Record<string, InitialConfig>).initialConfig ?? {};
  }
  return {} as InitialConfig;
}

export function getInitialConfig(): InitialConfig {
  if (initialConfig) return initialConfig;

  initialConfig = {
    ...defaultInitialConfig,
    ...getInitialConfigFromScriptElement(),
    ...getInitialConfigFromWindow(),
    ...getInitialConfigFromURLParameters(),
  };

  return initialConfig;
}
