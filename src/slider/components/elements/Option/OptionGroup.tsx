import React, { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Space } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderWidgetProps } from '../../../types/Widget';
import { shuffle } from '../../../utils/math';
import { noop } from '../../../utils/noop';
import { converStringToBooleanMap, covertBooleanMapToString } from '../../../utils/object';

import styles from './OptionGroup.module.css'

interface OptionGroupProps extends SliderWidgetProps {
  gap?: string;
  multiple?: boolean;
  children?: ReactNode;
  checkedColor?: string;
  direction?: 'horizontal' | 'vertical'
  random?: boolean;
}

interface OptionGroupAPI {
  values: Record<string, boolean>
  selectOption(name: string, selected: boolean):void;
}

const OptionGroupContext = React.createContext<OptionGroupAPI>({
  values: {},
  selectOption: noop,
});

export function OptionGroup(props: OptionGroupProps) {
  const gap = props.gap ?? '0.25rem';
  const multiple = props.multiple ?? false;
  const store = useStore();
  const defaultSelectedValues = useMemo(() => {
    const value = store.get<string>(props.name) ?? '';
    return converStringToBooleanMap(value, ',');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedValues, setSelectedValues] = useState(defaultSelectedValues as Record<string, boolean>);

  const selectOptionHandle = useCallback(
    (name: string, selected: boolean) => {
      const values = {
        ...(multiple && selectedValues),
        [name]: selected,
      };
      setSelectedValues(values);
      store.set(props.name, covertBooleanMapToString(values, ',')); 
    },
    [multiple, props.name, selectedValues, store],
  )
  
  const inst = useMemo(() => {
    return {
      values: selectedValues,
      selectOption: selectOptionHandle
    }
  }, [selectOptionHandle, selectedValues]);

  const randomChildren = useMemo(() => {
    return (props.random && Array.isArray(props.children)) ? shuffle(props.children) : props.children;
  }, [props.children, props.random]);

  return (
    <OptionGroupContext.Provider value={inst}>
      <Space wrap block className={styles.main} gap={gap} direction={props.direction}>
        { randomChildren }
      </Space>
    </OptionGroupContext.Provider>
  );
}

export function useOptionGroup() {
  return useContext(OptionGroupContext);
}
