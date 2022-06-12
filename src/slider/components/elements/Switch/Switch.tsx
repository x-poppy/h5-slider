import React, { useCallback, useMemo, useState } from 'react';
import { Switch as OriginSwitch } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

export interface SwitchProps extends SliderComponentProps {
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
    return store.get<boolean>(props.name) ?? false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name]);

  
  
  const [checked, setChecked] = useState(defaultChecked);
  const onChangeHandle = useCallback(
    (val: boolean) => {
      store.set(props.name, props.inactiveValue ?? !!val);
      setChecked(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked, props.activeValue, props.inactiveValue, props.name],
  );

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
