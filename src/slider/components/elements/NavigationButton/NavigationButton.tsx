import React, { useCallback, useMemo } from 'react';
import { Button, ButtonSize, ButtonType } from 'react-vant';
import { ShareO } from '@react-vant/icons';

import { SliderComponentProps } from '../../../types/Component';
import { getURLWithQueryString } from '../../../utils/url';
import { navigateTo } from '../../../utils/navigateTo';
import { getReferenceVariableValue } from '../../../utils/express';
import { useStore } from '../../../hooks/useStore';

export interface NavigationButtonProps extends SliderComponentProps {
  type?: ButtonType,
  size?: ButtonSize,
  color?: string,
  plain?: boolean,
  square?: boolean,
  round?: boolean,
  shadow?: boolean | 1 | 2 | 3;
  children?: string;
  href: string | string[];
  searchMatcher?: string | string[];
}

function NavigationButton(props: NavigationButtonProps) {
  const store = useStore();
  const href = useMemo(() => {
    return getReferenceVariableValue(props.href, '', (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.href]);

  const onClickHandle = useCallback(async () => {
      const navigateURL = getURLWithQueryString(href, props.searchMatcher);
      if (!navigateURL) {
        return;
      }
      navigateTo(navigateURL, {
        searchMatcher: props.searchMatcher,
        knownHosts: props.$$schema.security?.knownHosts,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.href, props.searchMatcher],
  )
  return (
    <Button
      onClick={onClickHandle}
      round={props.round}
      type={props.type}
      color={props.color}
      plain={props.plain}
      square={props.square}
      shadow={props.shadow}
      icon={<ShareO />}
    >
      { props.children }
    </Button>
  );
}

export default NavigationButton;
