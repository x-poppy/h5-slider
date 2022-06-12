import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonType } from 'react-vant';
import { ShareO } from '@react-vant/icons';

import { SliderComponentProps } from '../../../types/Component';
import { getNavigationURL } from '../../../utils/url';
import { navigateTo } from '../../../utils/navigateTo';
import { getRandomValueFromArray } from '../../../utils/random';

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
  const onClickHandle = useCallback(async () => {
    const href = getRandomValueFromArray(props.href);
      const navigateURL = getNavigationURL(href, props.searchMatcher);
      if (!navigateURL) {
        return;
      }
      
      navigateTo(navigateURL, {
        searchMatcher: props.searchMatcher
      });
    },
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
