import React, { useMemo } from 'react';
import classnames from 'classnames';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Gap.module.css';

export interface GapProps extends SliderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  width?: string;
  height?: string;
}

function Gap(props: GapProps) {
  const initStyle = useMemo(() => ({
    width: props.width,
    height: props.height,
    // eslint-disable-next-line
  }), []);

  const size = props.size ?? 'md';
  return (
    <div 
      className={classnames(styles.main, 
      size && 'size__' + size,
    )}
    style={initStyle}
    >
    </div>
  );
}

export default Gap;
