import React, { useCallback } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyType } from 'react-vant/es/typography/PropsType';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';
import { getURLWithQueryString } from '../../../utils/url';
import { navigateTo } from '../../../utils/navigateTo';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

export interface LinkProps extends SliderComponentProps {
  width?: string | number
  type?: TypographyType;
  size?: TypographySize;
  disabled?: boolean;
  delete?: boolean;
  underline?: boolean;
  center?: boolean;
  strong?: boolean;
  ellipsis?: boolean | number;
  children?: React.ReactNode;

  href?: string;
  searchMatcher?: string | string[];
  //events
  clickEffect?: SliderEffectElement;
}

const EventNames = {
  OnClick: "onClick",
}

function Link(props: LinkProps) {
  const loadingIndicator = useLoadingIndicator();
  const dispatchEffect = useDispatchEffect();

  const onClickHandle = useCallback(async () => {
    // link
    if (!props.clickEffect) {
      if (!props.href) {
        return;
      }

      const navigateURL = getURLWithQueryString(props.href, props.searchMatcher);
      if (!navigateURL) {
        return;
      }
      navigateTo(navigateURL, {
        searchMatcher: props.searchMatcher,
        knownHosts: props.$$schema.security?.knownHosts,
      });
      return;
    }

    // effect mode
    try {
      loadingIndicator.start();
      await dispatchEffect(props.clickEffect, {
        eventName: EventNames.OnClick
      })
      loadingIndicator.end();
    } catch (err) {
      loadingIndicator.end();
    }
  }, [dispatchEffect, loadingIndicator, props.$$schema.security?.knownHosts, props.clickEffect, props.href, props.searchMatcher]);
  
  return (
    <Typography.Link style={{width: props.width}} 
      onClick={onClickHandle}
      type={props.type}
      size={props.size}
      disabled={props.disabled}
      delete={props.delete}
      underline={props.underline}
      center={props.center}
      strong={props.strong}
      ellipsis={props.ellipsis}
    >
      {props.children}
    </Typography.Link>
  );
}

export default Link;
