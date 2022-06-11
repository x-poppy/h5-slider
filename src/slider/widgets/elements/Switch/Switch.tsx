import React, { useCallback, useMemo, useState } from 'react';
import { Switch as OriginSwitch } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderStorableWidgetProps } from '../../../types/Widget';
import { getReferenceVariableValue } from '../../../utils/express';

export interface SwitchProps extends SliderStorableWidgetProps {
  size?: string | number;
  activeColor?: string;
  inactiveColor?: string;
  activeValue?: any;
  inactiveValue?: any;
  disabled?: boolean | string | string[];
}

function Switch(props: SwitchProps) {
  const store = useStore();
  const disabled = useMemo(() => {
    return getReferenceVariableValue(props.disabled, false, (key: string) => store.get(key));
  }, [props.disabled, store]);

  const defaultChecked = useMemo(() => {
    return getReferenceVariableValue(props.name, false, (key: string) => store.get(key));
  }, [props.name, store]);
  
  const [checked, setChecked] = useState(defaultChecked);

  const onChangeHandle = useCallback(
    () => {
      if (checked) {
        store.set(props.name, props.inactiveValue ?? false);
        setChecked(false);
      } else {
        store.set(props.name, props.activeValue ?? true);
        setChecked(true);
      }
    },
    [checked, props.activeValue, props.inactiveValue, props.name, store],
  )

  return (
    <OriginSwitch 
      onChange={onChangeHandle}
      size={props.size}
      disabled={disabled}
      defaultChecked={defaultChecked}
      checked={checked}
    />
  );
}

export default Switch;
