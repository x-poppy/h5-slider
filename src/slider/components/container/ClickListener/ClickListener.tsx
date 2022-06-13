import React, { Children, cloneElement, ReactNode, useCallback } from 'react';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

export interface ClickListenerProps extends SliderComponentProps {
  clickEffect?: SliderEffectElement;
  children?: ReactNode;
}

const EventNames = {
  OnClick: 'OnClick'
}

function ClickListener(props: ClickListenerProps) {
  const dispatchEffect = useDispatchEffect();

  const onClickHandle = useCallback((event: React.MouseEvent) => {
    if (!props.clickEffect) {
      return;
    }
    if (!props.children) {
      return;
    }
    
    event.stopPropagation();

    dispatchEffect(props.clickEffect, {
      eventName: EventNames.OnClick
    })

  }, [dispatchEffect, props.children, props.clickEffect]);

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
    </>
  )
}

export default ClickListener;
