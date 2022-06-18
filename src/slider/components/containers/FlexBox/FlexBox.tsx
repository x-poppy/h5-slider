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
  wrap?: boolean;
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
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
    }
  }, [props.align, props.direction, props.height, props.justify, props.margin, props.padding, props.width, props.wrap]);

  return (
    <div className={styles.main} style={initStyle as any}>
      { props.children }
    </div>
  );
}

export default FlexBox;
