import React, { ReactNode } from 'react';
import { Space } from 'react-vant';
import { SliderWidgetProps, SpaceType } from '../../../types/UI';

import styles from './FlexBox.module.css';

export interface FlexBoxProps extends SliderWidgetProps {
  block?: boolean
  children: ReactNode;
  gap?: SpaceType
  padding?: SpaceType
  height?: string | number
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
}

// https://react-vant.3lang.dev/en/components/space
function FlexBox(props: FlexBoxProps) {
  const height = typeof props.height === 'number' ? props.height + 'px' : props.height;
  return (
    <Space onClick={props.onClick} className={styles.main} 
      style={{padding: props.padding,  height,}}
      wrap 
      block={props.block}
      direction={props.direction} 
      align={props.align} 
      justify={props.justify} 
      gap={props.gap}>
      { props.children }
    </Space>
  );
}

export default FlexBox;
