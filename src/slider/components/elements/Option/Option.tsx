import React, { ReactNode, useCallback } from 'react';
import { Checkbox } from 'react-vant';
import { SliderComponentProps } from '../../../types/Component';
import { useOptionGroup } from './OptionGroup';

export interface OptionProps extends SliderComponentProps {
  shape?: 'square' | 'round'
  checkedColor?: string;
  children: ReactNode;
}

function Option(props: OptionProps) {
  const optionGroup = useOptionGroup();

  const checked = props.name ? (optionGroup.values[props.name] ?? false) : false;

  const onClickHandel = useCallback(() => {
    optionGroup.selectOption(props.name, !checked);
  }, [checked, optionGroup, props.name]);
  
  return (
    <Checkbox
      shape={props.shape} 
      onClick={onClickHandel}
      checked={checked}
      checkedColor={props.checkedColor}
      name={props.name}> 
        { props.children}
    </Checkbox>
  );
}

export default Option;
