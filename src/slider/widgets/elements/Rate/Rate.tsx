import React, { useCallback, useMemo, useState } from 'react';
import { Rate as OriginRate } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderStorableWidgetProps } from '../../../types/Widget';
import { getReferenceVariableValue } from '../../../utils/express';

export interface RateProps extends SliderStorableWidgetProps {
  size?: number | string;
  gutter?: number | string;
  color?: string;
  voidColor?: string;
  allowHalf?: boolean;
  readonly?: boolean;
  count?: number | string | string[]
  // store bindable
  disabled?: boolean | string | string[];
  disabledColor?: string;
}

function Rate(props: RateProps) {
  const store = useStore();
  const defaultValue = useMemo(() => {
    return getReferenceVariableValue(props.name, 0, (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabled = useMemo(() => {
    return getReferenceVariableValue(props.disabled, false, (key: string) => store.get(key));
  }, [props.disabled, store]);

  const [value, setValue] = useState(defaultValue);

  const onChangeHandle = useCallback(
    (val: number) => {
      setValue(val);
      store.set(props.name, val);
    }, 
    [props.name, store]);

  return (
    <OriginRate
      defaultValue={defaultValue}
      value={value}
      size={props.size}
      gutter={props.gutter}
      color={props.color}
      voidColor={props.voidColor}
      allowHalf={props.allowHalf}
      readonly={props.readonly}
      disabled={disabled}
      disabledColor={props.disabledColor}
      onChange={onChangeHandle}
    />
  );
}

export default Rate;
