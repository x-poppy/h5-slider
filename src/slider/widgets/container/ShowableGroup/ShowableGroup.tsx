import React, { ReactNode, useMemo } from 'react';
import { useStore } from '../../../hooks/useStore';
import { SliderWidgetProps } from '../../../types/Widget';

export interface ShowableGroupProps extends SliderWidgetProps {
  show: boolean | string | string[]
  children: ReactNode;
}

function ShowableGroup(props: ShowableGroupProps) {
  const store = useStore();
  const isShow = useMemo(() => {
    if (typeof props.show === 'boolean') {
      return props.show;
    }
    
    if (typeof props.show === 'string') {
      return !!store.get(props.show);
    }
    
    if (Array.isArray(props.show)) {
      return props.show.some((item) => !!store.get(item));
    }
    return true;
  }, [props.show, store]);

  if (!isShow) {
    return null;
  }

  return props.children;
}

export default ShowableGroup;
