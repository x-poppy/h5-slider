import React, { useEffect } from 'react';
import { SliderEffectProps } from '../../../types/UI';

interface DelayEffectProps extends SliderEffectProps {
  delay?: number;
}

function DelayEffect(props: DelayEffectProps) {
  useEffect(() => {
    setTimeout(() => {
      props.onEffectComplete();
    }, props.delay ?? 1000);
  }, [props])
  
  return null;
}

export default DelayEffect;
