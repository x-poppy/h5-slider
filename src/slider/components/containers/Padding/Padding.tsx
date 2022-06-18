import React, { ReactNode, useMemo } from 'react';
import classnames from 'classnames';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Padding.module.css';

export interface PaddingProps extends SliderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  width?: string;
  height?: string;
  padding?: string;
  children?: ReactNode
}

function Padding(props: PaddingProps) {
  const size = props.size ?? 'md';
  const initStyle = useMemo(() => ({
    width: props.width,
    height: props.height,
    padding: props.padding,
  }), [props.height, props.padding, props.width]);
  return (
    <div className={classnames(styles.main, 
      size && 'size__' + size,
    )} style={initStyle}>
      { props.children }
    </div>
  );
}

export default Padding;
