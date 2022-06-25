import React, { ReactNode, useMemo } from 'react';
import classnames from 'classnames';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Padding.module.css';

export interface PaddingProps extends SliderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
  children?: ReactNode
}

function Padding(props: PaddingProps) {
  const size = props.size ?? 'md';
  const initStyle = useMemo(() => ({
    width: props.width,
    height: props.height,
    padding: props.padding,
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);
  return (
    <div className={classnames(styles.main, 
      size && 'size__' + size,
    )} style={initStyle}>
      { props.children }
    </div>
  );
}

export default Padding;
