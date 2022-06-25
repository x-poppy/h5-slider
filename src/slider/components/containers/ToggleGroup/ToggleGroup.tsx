import React, { ReactNode, useMemo } from 'react';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

export interface ToggleGroupProps extends SliderComponentProps {
  defaultShow?: boolean;
  show: boolean | string | string[]
  children: ReactNode;
}

function ToggleGroup(props: ToggleGroupProps) {
  const store = useStore();
  
  const show = useMemo(() => {
    return getReferenceVariableValue(props.show, props.defaultShow ?? false, (key: string) => store.get(key));
  }, [props.defaultShow, props.show, store]);

  if (!show) {
    return null;
  }

  return props.children;
}

export default ToggleGroup;
