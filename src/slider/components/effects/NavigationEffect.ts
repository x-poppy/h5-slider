import { SliderEffectProps } from '../../types/Component';
import { navigateTo } from '../../utils/navigateTo';
import { getRandomValueFromArray } from '../../utils/random';

export interface NavigationEffectProps extends SliderEffectProps {
  href: string | string[];
  searchMatcher?: string | string[];
}

async function NavigationEffect(props: NavigationEffectProps) {
  await navigateTo(getRandomValueFromArray(props.href), {
    searchMatcher: props.searchMatcher,
    i18nMessageBundle: props.i18nMessageBundle,
    knownHosts: props.$$schema.security?.knownHosts,
  });
}

export default NavigationEffect;
