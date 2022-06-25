import React, { ReactNode, useMemo } from 'react';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';

import styles from './FlexBox.module.css';

export interface FlexBoxProps extends SliderComponentProps, ClickAbleComponentProps {
  children: ReactNode;
  background?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  direction?: 'row' | 'column';
  wrap?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
}

function FlexBox(props: FlexBoxProps) {
  const initStyle = useMemo(() => {
    return {
      background: props.background,
      padding: props.padding,
      width: props.width,
      height: props.height,
      margin: props.margin,
      flexDirection: props.direction,
      alignItems: props.align,
      justifyContent: props.justify,
      // font
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
      fontSize: props.fontSize,
      color: props.fontColor,
      fontWeight: props.fontWeight,
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.main} style={initStyle as any}>
      { props.children }
    </div>
  );
}

export default FlexBox;
