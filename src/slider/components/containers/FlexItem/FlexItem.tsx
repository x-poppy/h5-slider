import React, { ReactNode, useMemo } from 'react';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';

import styles from './FlexItem.module.css';

export interface FlexItemProps extends SliderComponentProps, ClickAbleComponentProps {
  flex: string
  children: ReactNode;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  alignSelf?: string;
  justifySelf?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
}
function FlexItem(props: FlexItemProps) {
  const initStyle = useMemo(() => ({
    padding: props.padding,
    width: props.width,
    height: props.height,
    margin: props.margin,
    flex: props.flex,
    alignSelf: props.alignSelf,
    justifySelf: props.justifySelf,
    // font
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
    // eslint-disable-next-line
  }), []);
  
  return (
    <div className={styles.main} style={initStyle}>
      { props.children }
    </div>
  );
}

export default FlexItem;
