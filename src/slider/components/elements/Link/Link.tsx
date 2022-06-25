import React, { useCallback, useMemo } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyType } from 'react-vant/es/typography/PropsType';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';
import { getReferenceVariableValue } from '../../../utils/express';
import { useStore } from '../../../hooks/useStore';

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

  text?: string;
  children?: string;

  //events
  clickEffect?: SliderEffectElement;

  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
}

const EventNames = {
  OnClick: "onClick",
}

function Link(props: LinkProps) {
  const store = useStore();
  const loadingIndicator = useLoadingIndicator();
  const dispatchEffect = useDispatchEffect();

  const initStyle = useMemo(() => ({
    width: props.width,
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const content = useMemo(() => {
    return getReferenceVariableValue(props.text ?? props.children, '', (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  const onClickHandle = useCallback(async () => {
    if (!props.clickEffect) {
      return;
    }

    if (loadingIndicator.loading) {
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
      { content }
    </Typography.Link>
  );
}

export default Link;
