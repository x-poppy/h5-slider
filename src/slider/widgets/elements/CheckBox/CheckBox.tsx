import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { Cell, Checkbox } from 'react-vant';
import { SliderWidgetProps } from '../../../types/UI';
import styles from './CheckBox.module.css';

interface CheckBoxGroupProps extends SliderWidgetProps {
  max?: number;
  children?: ReactNode;
}

const EXCheckBoxGroupContext = React.createContext([]);

export function CheckBoxGroup(props: CheckBoxGroupProps) {
  const [cellCheck, setCellCheck] = useState([]);

  return (
    <Checkbox.Group max={props.max} value={cellCheck} className={styles.mainGroup}>
      <EXCheckBoxGroupContext.Provider value={[]}>
        { props.children }
      </EXCheckBoxGroupContext.Provider>
    </Checkbox.Group>
  );
}

export interface CheckBoxProps extends SliderWidgetProps{
  shape?: 'square' | 'round'
  name?: string;
  children: ReactNode;
}

function CheckBox(props: CheckBoxProps) {
  const first = useContext(EXCheckBoxGroupContext)

  const onClickHandle = useCallback(
    (evt: any) => {
      props.onClick?.(evt);
      console.log('11111');
    },
    [props],
  )

  return (
    <Cell 
      className={styles.main} 
      clickable 
      center
      border
      size="large"
      onClick={onClickHandle}
      icon={<Checkbox shape={props.shape}  />}
      >
      { props.children }
    </Cell>
  );
}

export default CheckBox;
