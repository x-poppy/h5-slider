import React, { ReactNode } from 'react';
import { Divider as OriginDivider } from 'react-vant';
import { DividerContentPosition } from 'react-vant/es/divider/PropsType';
import { SliderWidgetProps } from '../../../types/Widget';

import styles from './Divider.module.css'

// https://react-vant.3lang.dev/en/components/divider
export interface DividerProps extends SliderWidgetProps {
  dashed?: boolean;
  hairline?: boolean;
  contentPosition?: DividerContentPosition;
  children?: ReactNode
  color?: string;
}
function Divider(props: DividerProps) {
  return (
    <OriginDivider  
      className={styles.main}
      style={props.color && {
        color: props.color,
        borderColor: props.color
      }}
      dashed={props.dashed}
      hairline={props.hairline}
      contentPosition={props.contentPosition}
    >
      { props.children }
    </OriginDivider>
  );
}

export default Divider;
