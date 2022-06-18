import React, { useMemo } from 'react';
import classnames from 'classnames';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Gap.module.css';

export interface GapProps extends SliderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  horizontal?:boolean;
  margin?: string;
  width?: string;
  height?: string;
  
}

function Gap(props: GapProps) {
  const initStyle = useMemo(() => ({
    width: props.width,
    height: props.height,
    margin: props.margin,
  }), [props.height, props.margin, props.width]);

  const directionCssName = props.horizontal ?
    'w_' : 'h_';

  const size = props.size ?? 'md';
  return (
    <div
      className={classnames(styles.main, 
      size && directionCssName + 'size__' + size,
    )}
    style={initStyle}
    >
    </div>
  );
}

export default Gap;
