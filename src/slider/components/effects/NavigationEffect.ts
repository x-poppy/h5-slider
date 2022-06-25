import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigate';
import { appendQueryToUrl, getQueryObjectFromLocalStorage, getQueryObjectFromSearch } from '../../utils/url';

export interface NavigationEffectProps extends SliderEffectProps {
  url: string;
  mock?: boolean;
  // white list
  searchMatcher?: string | string[];
  // white list
  localStorageMatcher?: string | string[];
  query?: Record<string, any>;
  skipSecurityCheck?: boolean
}

async function NavigationEffect(props: NavigationEffectProps) {
  const context = props.context;

  const queryStringQueryData = getQueryObjectFromSearch(props.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(props.localStorageMatcher);

  const url = context.variableScopes.getExpressValue(props.url, {
    ...props,
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
    }
  });
  if (!url) {
    throw new Error("Invalid URL!");
  }

  // const transformedUrl = appendQueryToUrl(url, {
  //   ...queryStringQueryData,
  //   ...localStorageQueryData,
  //   ...props.query,
  // })

  const mock = (props.mock ?? false) && !!context.initialConfig.mock;
  await navigateTo(url, {
    i18nMessageBundle: context.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
    mock,
  });

  await new Promise(res => setTimeout(res, 600000));
}

export default NavigationEffect;
