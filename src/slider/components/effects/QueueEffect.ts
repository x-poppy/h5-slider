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
      variableScopes: props.variableScopes,
      i18nMessageBundle: props.i18nMessageBundle,
      store: props.store,
      httpClient: props.httpClient,
      event: props.event,
    };
    await effectElement.$$effect(effectElementProps);
  }
}

export default QueueEffect;
