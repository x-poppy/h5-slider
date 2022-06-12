import React, { Children, cloneElement, ReactNode, useCallback } from 'react';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';

export interface ClickListenerProps extends SliderComponentProps {
  clickEffect?: SliderEffectElement;
  children?: ReactNode;
}

const EventNames = {
  OnClick: 'OnClick'
}

function ClickListener(props: ClickListenerProps) {
  const [ activeClickEffect, openClickEffect, isValidClickEffect] = useEffectElement(props.clickEffect);

  const onClickHandle = useCallback(() => {
    if (!isValidClickEffect) {
      return;
    }
    if (!props.children) {
      return;
    }
    openClickEffect({
      eventName: EventNames.OnClick
    });
  }, [isValidClickEffect, openClickEffect, props.children])

  if (!props.children) {
    return null;
  }

  return (
  <>
    {
      cloneElement(Children.only(props.children as any), {
        onClick: onClickHandle
      })
    }
    { activeClickEffect }
  </>
  )
}

export default ClickListener;
