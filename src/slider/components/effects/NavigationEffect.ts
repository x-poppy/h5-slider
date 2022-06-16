import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigate';

export interface NavigationEffectProps extends SliderEffectProps {
  url: string;
  searchMatcher?: string | string[];
  responseDataPath?: string;
  skipSecurityCheck?: boolean
}

async function NavigationEffect(props: NavigationEffectProps) {
  const context = props.context;

  const url = context.variableScopes.getExpressValue(props.url, props);
  if (!url) {
    throw new Error("Invalid URL!");
  }

  await navigateTo(url, {
    searchMatcher: props.searchMatcher,
    i18nMessageBundle: context.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
  });
}

export default NavigationEffect;
