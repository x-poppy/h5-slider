import React, { ReactNode, useMemo } from 'react';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';

import styles from './FlexBox.module.css';

export interface FlexBoxProps extends SliderComponentProps, ClickAbleComponentProps {
  children: ReactNode;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  direction?: 'row' | 'column';
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
}

function FlexBox(props: FlexBoxProps) {
  const initStyle = useMemo(() => {
    return {
      padding: props.padding,
      width: props.width,
      height: props.height,
      margin: props.margin,
      flexDirection: props.direction,
      alignItems: props.align,
      justifyContent: props.justify,
      // eslint-disable-next-line
    }
  }, [props.align, props.direction, props.height, props.justify, props.margin, props.padding, props.width]);

  return (
    <div className={styles.main} style={initStyle}>
      { props.children }
    </div>
  );
}

export default FlexBox;
