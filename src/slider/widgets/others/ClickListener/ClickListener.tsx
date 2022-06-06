import React, { Children, cloneElement, ReactNode, useCallback } from 'react';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderWidgetProps, SliderEffectReactElement } from '../../../types/UI';

export interface ClickListenerProps extends SliderWidgetProps {
  clickEffect?: SliderEffectReactElement;
  children?: ReactNode;
}

const EventNames = {
  OnClick: 'OnClick'
}

function ClickListener(props: ClickListenerProps) {
  const { activeEffect, openEffect } = useEffectElement(props.clickEffect);

  const onClickHandle = useCallback(() => {
    if (!props.children) {
      return;
    }
    openEffect({
      eventName: EventNames.OnClick
    });
  }, [openEffect, props.children])

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
    { activeEffect }
  </>
  )
}

export default ClickListener;
