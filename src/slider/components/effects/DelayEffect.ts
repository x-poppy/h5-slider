import { SliderEffectProps } from '../../types/Component';

interface DelayEffectProps extends SliderEffectProps {
  delay?: number;
}

async function DelayEffect(props: DelayEffectProps) {
  if (props.delay === undefined) {
    return;
  }
  await new Promise(res => setTimeout(res, ~~(props.delay!)));
}

export default DelayEffect;
