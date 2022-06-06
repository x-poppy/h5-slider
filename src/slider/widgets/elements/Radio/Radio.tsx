import React, { ReactNode, useCallback } from 'react';
import { Radio as OriginRadio, Space } from 'react-vant';
import { SliderWidgetProps } from '../../../types/UI';
import styles from './Radio.module.css';

interface RadioGroupProps extends SliderWidgetProps {
  max?: number;
  children?: ReactNode;
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <OriginRadio.Group>
      { props.children }
    </OriginRadio.Group>
  );
}

export interface RadioProps extends SliderWidgetProps {
  shape?: 'square' | 'round'
  name?: string;
  children: ReactNode;
}

function Radio(props: RadioProps) {
  const onClickHandle = useCallback(
    (evt: any) => {
      props.onClick?.(evt);
      console.log('11111');
    },
    [props],
  )

  return (
    <Space className={styles.main} onClick={onClickHandle}>
      <OriginRadio 
        onClick={onClickHandle}
        shape={props.shape} 
        name={props.name}  />
      { props.children }
    </Space>
  );
}

export default Radio;
