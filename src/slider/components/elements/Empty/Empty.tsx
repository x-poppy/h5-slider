import React, { useEffect } from 'react';
import { SliderComponentProps } from '../../../types/Component';

import { SliderEffectElement } from '../../../types/Element';
import { callback } from '../../../utils/callback';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

const EventNames = {
  OnAttach: 'onAttach',
  OnDetach: 'onDetach',
}

export interface EmptyProps extends SliderComponentProps {
  attachEffect?: SliderEffectElement;
  detachEffect?: SliderEffectElement;
}

function Empty(props: EmptyProps) {
  const dispatchEffect = useDispatchEffect();
  
  useEffect(() => {
    callback(async () => {
      if (!props.attachEffect) {
        return;
      }
      await dispatchEffect(props.attachEffect!, {
        eventName: EventNames.OnAttach
      });
    })
  
    return () => {
      callback(async () => {
        await dispatchEffect(props.attachEffect!, {
          eventName: EventNames.OnAttach
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return null;
}

export default Empty;
