import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { SliderEffectProps } from '../../../types/Component';

interface DelayEffectProps extends SliderEffectProps {
  delay?: number;
}

function DelayEffect(props: DelayEffectProps) {
  useAsyncEffect(async () => {
    setTimeout(() => {
      props.onEffectComplete();
    }, props.delay ?? 1000);
  }, [props.event], {
    valid: !!props.event
  });
  
  return null;
}

export default DelayEffect;
