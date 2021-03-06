import React, { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { noop } from '../../../utils/noop';
import { convertStringToBooleanMap, covertBooleanMapToString } from '../../../utils/object';

interface OptionGroupProps extends SliderComponentProps {
  multiple?: boolean;
  nullable?: boolean;
  children?: ReactNode;
  checkedColor?: string;
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
  const multiple = props.multiple ?? false;
  const store = useStore();
  const defaultSelectedValues = useMemo(() => {
    const value = store.get<string>(props.name) ?? '';
    return convertStringToBooleanMap(value, ',');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedValues, setSelectedValues] = useState(defaultSelectedValues as Record<string, boolean>);

  const selectOptionHandle = useCallback(
    (name: string, selected: boolean) => {
      if (!props.nullable && !selected) {
        const selectedCount = Object.keys(selectedValues).reduce((sum, key) => {
          if (selectedValues[key]) {
            sum = sum + 1;
          }
          return sum;
        }, 0)
        // the last one, if unselect it will be 0
        if (selectedCount === 1) {
          return;
        }
      }

      const values = {
        ...(multiple && selectedValues),
        [name]: selected,
      };
      setSelectedValues(values);
      store.set(props.name, covertBooleanMapToString(values, ',')); 
    },
    [multiple, props.name, props.nullable, selectedValues, store],
  );
  
  const inst = useMemo(() => {
    return {
      values: selectedValues,
      selectOption: selectOptionHandle
    }
  }, [selectOptionHandle, selectedValues]);

  return (
    <OptionGroupContext.Provider value={inst}>
      { props.children }
    </OptionGroupContext.Provider>
  );
}

export function useOptionGroup() {
  return useContext(OptionGroupContext);
}
