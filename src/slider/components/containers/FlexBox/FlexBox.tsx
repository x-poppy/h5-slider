import React, { ReactNode, useMemo } from 'react';
import { Space } from 'react-vant';
import { ClickAbleComponentProps, SliderComponentProps, SpaceType } from '../../../types/Component';

import styles from './FlexBox.module.css';

export interface FlexBoxProps extends SliderComponentProps, ClickAbleComponentProps {
  block?: boolean
  children: ReactNode;
  gap?: SpaceType
  padding?: string;
  margin?: string;
  width?: string
  height?: string
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
}

// https://react-vant.3lang.dev/en/components/space
function FlexBox(props: FlexBoxProps) {
  const initStyle = useMemo(() => ({
    padding: props.padding,
    width: props.width,
    height: props.height,
    margin: props.margin,
    // eslint-disable-next-line
  }), []);

  return (
    <Space onClick={props.onClick} className={styles.main} 
      style={initStyle}
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
