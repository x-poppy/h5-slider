import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigate';
import { appendQueryToUrl, getQueryObjectFromLocalStorage, getQueryObjectFromSearch } from '../../utils/url';

export interface NavigationEffectProps extends SliderEffectProps {
  url: string;
  mock?: boolean;
  // white list
  searchMatcher?: string | string[];
  // white list
  localStorageEffectMatcher?: string | string[];
  query?: Record<string, any>;
  skipSecurityCheck?: boolean
}

async function NavigationEffect(props: NavigationEffectProps) {
  const context = props.context;

  const queryStringQueryData = getQueryObjectFromSearch(props.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(props.localStorageEffectMatcher);

  const url = context.variableScopes.getExpressValue(props.url, {
    ...props,
  });
  if (!url) {
    throw new Error("Invalid URL!");
  }

  const transformedUrl = appendQueryToUrl(url, {
    ...queryStringQueryData,
    ...localStorageQueryData,
    ...props.query,
  })

  await navigateTo(transformedUrl, {
    i18nMessageBundle: context.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
    mock: props.mock ?? false
  });

  await new Promise(res => setTimeout(res, 600000));
}

export default NavigationEffect;
