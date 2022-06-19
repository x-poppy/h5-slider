import React, { useCallback, useMemo } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyType } from 'react-vant/es/typography/PropsType';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';
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
  //events
  clickEffect?: SliderEffectElement;

  fontSize?: string;
  color?: string;
}

const EventNames = {
  OnClick: "onClick",
}

function Link(props: LinkProps) {
  const loadingIndicator = useLoadingIndicator();
  const dispatchEffect = useDispatchEffect();

  const onClickHandle = useCallback(async () => {
    if (!props.clickEffect) {
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
  }, [dispatchEffect, loadingIndicator, props.clickEffect]);

  const initStyle = useMemo(() => ({
    width: props.width,
    fontSize: props.fontSize,
    color: props.color
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);
  
  return (
    <Typography.Link style={initStyle} 
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
