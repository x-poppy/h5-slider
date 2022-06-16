import { SliderEffectProps } from '../../types/Component';
import { SliderEffectElement } from '../../types/Element';

interface QueueEffectProps extends SliderEffectProps {
  children?: SliderEffectElement[]
}

async function QueueEffect(props: QueueEffectProps) {
  const children = props.children ?? [];
  const queue = children.concat();

  for (const effectElement of queue) {
    const effectElementProps = {
      ...effectElement,
      event: props.event,
      context: props.context,
    };
    await effectElement.$$effect(effectElementProps);
  }
}

export default QueueEffect;
