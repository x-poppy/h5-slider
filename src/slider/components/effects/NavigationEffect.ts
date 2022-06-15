import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigateTo';

export interface NavigationEffectProps extends SliderEffectProps {
  url: string;
  searchMatcher?: string | string[];
  responseDataPath?: string;
  skipSecurityCheck?: boolean
}

async function NavigationEffect(props: NavigationEffectProps) {
  const url = props.variableScopes.getExpressValue(props.url, props);
  if (!url) {
    throw new Error("Invalid URL!");
  }

  await navigateTo(url, {
    searchMatcher: props.searchMatcher,
    i18nMessageBundle: props.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
  });
}

export default NavigationEffect;
