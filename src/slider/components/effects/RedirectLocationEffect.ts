import { SliderEffectProps } from '../../types/Component';
import { redirectTo } from '../../utils/redirectLocation';

export interface RedirectLocationEffectProps extends SliderEffectProps {
  url: string;
  searchMatcher?: string | string[];
  responseDataPath?: string;
  skipSecurityCheck?: boolean
}

async function RedirectLocationEffect(props: RedirectLocationEffectProps) {
  const url = props.variableScopes.getExpressValue(props.url, props);
  if (!url) {
    throw new Error("Invalid URL!");
  }

  await redirectTo(url, {
    searchMatcher: props.searchMatcher,
    i18nMessageBundle: props.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
    skipSecurityCheck: props.skipSecurityCheck ?? false,
  });
}

export default RedirectLocationEffect;
