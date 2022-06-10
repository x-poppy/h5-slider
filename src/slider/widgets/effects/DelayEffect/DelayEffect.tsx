import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { SliderEffectProps } from '../../../types/Widget';

interface DelayEffectProps extends SliderEffectProps {
  delay?: number;
}

function DelayEffect(props: DelayEffectProps) {
  useAsyncEffect(async () => {
    setTimeout(() => {
      props.onEffectComplete();
    }, props.delay ?? 1000);
  }, [props.event], {
    isThrowErr: false,
    valid: !!props.event
  });
  
  return null;
}

export default DelayEffect;
