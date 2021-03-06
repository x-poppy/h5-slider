import { SliderEffectProps } from '../../types/Component';
import { StoreValueType } from '../../utils/storage';

export interface WriteStoreEffectProps extends SliderEffectProps {
  value: StoreValueType;
  type: 'stepper' | 'toggle'
}

async function WriteStoreEffect(props: WriteStoreEffectProps) {
  const context = props.context;
  const store = context.store;
  
  if (props.type === 'stepper') {
    const preVal = ~~(store.get(props.name) ?? 0);
    const val = ~~(props.value ?? 0);
    if (val === 0) {
      return;
    }
    store.set(props.name, preVal + val)
  } else if (props.type === 'toggle') {
    const preVal = !!(store.get(props.name) ?? 0);
    store.set(props.name, !preVal);
  } else {
    store.set(props.name, props.value ?? "");
  }
}

export default WriteStoreEffect;
