import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigateTo';

export interface NavigationEffectProps extends SliderEffectProps {
  url: string;
  searchMatcher?: string | string[];
  responseDataPath?: string;
  skipSecurityCheck?: boolean
}

async function NavigationEffect(props: NavigationEffectProps) {
  const href = props.variableScopes.getExpressValue(props.url, props);
  await navigateTo(href, {
    searchMatcher: props.searchMatcher,
    i18nMessageBundle: props.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
  });
}

export default NavigationEffect;
