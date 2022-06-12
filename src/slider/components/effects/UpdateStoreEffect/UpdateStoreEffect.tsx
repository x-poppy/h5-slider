import React from 'react';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useStore } from '../../../hooks/useStore';
import { SliderEffectProps } from '../../../types/Component';
import { StoreValueType } from '../../../utils/storage';

export interface UpdateStoreEffectProps extends SliderEffectProps {
  name: string;
  value: StoreValueType;
  type: 'stepper' | 'toggle'
}

function UpdateStoreEffect(props: UpdateStoreEffectProps) {
  const store = useStore();
  useAsyncEffect(async () => {
    if(!props.name) {
      props.onEffectComplete();
      return;
    }

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
    props.onEffectComplete();
  }, [props.event], {
    valid: !!props.event
  });

  return null;
}

export default UpdateStoreEffect;
