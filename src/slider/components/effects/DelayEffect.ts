import { SliderEffectProps } from '../../types/Component';

interface DelayEffectProps extends SliderEffectProps {
  delay?: number;
}

async function DelayEffect(props: DelayEffectProps) {
  await new Promise(res => setTimeout(res, props.delay ?? 1000));
}

export default DelayEffect;
