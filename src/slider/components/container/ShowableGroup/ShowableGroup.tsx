import React, { ReactNode, useMemo } from 'react';
import { useStore } from '../../../hooks/useStore';
import { SliderWidgetProps } from '../../../types/Widget';
import { getReferenceVariableValue } from '../../../utils/express';

export interface ShowableGroupProps extends SliderWidgetProps {
  show: boolean | string | string[]
  children: ReactNode;
}

function ShowableGroup(props: ShowableGroupProps) {
  const store = useStore();

  const show = useMemo(() => {
    return getReferenceVariableValue(props.show, false, (key: string) => store.get(key));
  }, [props.show, store]);

  if (!show) {
    return null;
  }

  return props.children;
}

export default ShowableGroup;
