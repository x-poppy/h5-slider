import React, { ReactNode, useMemo } from 'react';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

export interface ToggleGroupProps extends SliderComponentProps {
  show: boolean | string | string[]
  children: ReactNode;
}

function ToggleGroup(props: ToggleGroupProps) {
  const store = useStore();

  const show = useMemo(() => {
    return getReferenceVariableValue(props.show, false, (key: string) => store.get(key));
  }, [props.show, store]);

  if (!show) {
    return null;
  }

  return props.children;
}

export default ToggleGroup;
