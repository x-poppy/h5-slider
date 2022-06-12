import React, { useCallback } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyType } from 'react-vant/es/typography/PropsType';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';

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
}

const EventNames = {
  OnClick: "onClick",
}

function Link(props: LinkProps) {
  const loadingIndicator = useLoadingIndicator();
  const [activeClickEffect, openClickEffect, isValidClickEffect] = useEffectElement(props.clickEffect);

  const onClickHandle = useCallback(async () => {
    if (!isValidClickEffect) {
      return;
    }

    try {
      loadingIndicator.start();
      await openClickEffect({
        eventName: EventNames.OnClick
      });
      loadingIndicator.end();
    } catch (err) {
      loadingIndicator.end();
    }
  }, [isValidClickEffect, loadingIndicator, openClickEffect]);
  
  return (
    <>
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
      { activeClickEffect }
    </>
  );
}

export default Link;
