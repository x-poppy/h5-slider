import React, { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Space } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderWidgetProps } from '../../../types/Widget';
import { shuffle } from '../../../utils/math';
import { noop } from '../../../utils/noop';

import styles from './OptionGroup.module.css'

interface OptionGroupProps extends SliderWidgetProps {
  name: string;
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
    const valueStr = store.get<string>(props.name ?? "") ?? undefined;
    if (typeof valueStr === 'string') {
      return valueStr.split(',').reduce<Record<string, boolean>>((map, key: string) => {
        key = key.trim();
        if (key) {
          map[key] = true;
        }
        return map;
      }, {});
    }
    return [];
  }, [props.name, store]);

  const [selectedValues, setSelectedValues] = useState(defaultSelectedValues as Record<string, boolean>);

  const selectOptionHandle = useCallback(
    (name: string, selected: boolean) => {
      const targetSelectedValues:Record<string, boolean> = {
        ...(multiple && selectedValues),
        [name]: selected,
      };
      setSelectedValues(targetSelectedValues);
      const valueStr = Object.keys(targetSelectedValues).filter(key => !!targetSelectedValues[key]).join(",");
      store.set(props.name, valueStr);      
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
    if (!props.random) {
      return props.children;
    }

    if (!Array.isArray(props.children)) {
      return props.children;
    }

    return shuffle(props.children);
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
