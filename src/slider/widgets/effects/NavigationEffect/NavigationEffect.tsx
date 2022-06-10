import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useI18nMessageBundle } from '../../../hooks/useI18nMessageBundle';
import { SliderEffectProps } from '../../../types/Widget';
import { navigateTo } from '../../../utils/navigateTo';
import { getRandomValueFromArray } from '../../../utils/random';

export interface NavigationEffectProps extends SliderEffectProps {
  href: string | string[];
  searchMatcher?: string | string[];
}

function NavigationEffect(props: NavigationEffectProps) {
  const i18nMessageBundle = useI18nMessageBundle();
  useAsyncEffect(async () => {
    navigateTo(getRandomValueFromArray(props.href), {
      searchMatcher: props.searchMatcher,
      i18nMessageBundle,
    });
  }, [props.event], {
    isThrowErr: false,
    valid: !!props.event
  });
}

export default NavigationEffect;
