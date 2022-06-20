import React, { Children, cloneElement, ReactNode, useCallback } from 'react';
import { SliderEffectElement } from '../../../types/Element';
import { SliderComponentProps } from '../../../types/Component';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';

export interface ClickListenerProps extends SliderComponentProps {
  clickEffect?: SliderEffectElement;
  children?: ReactNode;
}

const EventNames = {
  OnClick: 'OnClick'
}

function ClickListener(props: ClickListenerProps) {
  const dispatchEffect = useDispatchEffect();
  const loadingIndicator = useLoadingIndicator();

  const onClickHandle = useCallback(async (event: React.MouseEvent) => {
    if (!props.clickEffect) {
      return;
    }

    if (loadingIndicator.loading) {
      return;
    }

    if (!props.children) {
      return;
    }

    event.stopPropagation();

    try {
      loadingIndicator.start();
      await dispatchEffect(props.clickEffect, {
        eventName: EventNames.OnClick
      })
      loadingIndicator.end();
    } catch (err) {
      loadingIndicator.end();
    }
  }, [dispatchEffect, loadingIndicator, props.children, props.clickEffect]);

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
