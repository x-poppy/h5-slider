import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Padding.module.css';

export interface PaddingProps extends SliderComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  children?: ReactNode
}

function Padding(props: PaddingProps) {
  const size = props.size ?? 'md';
  return (
    <div className={classnames(styles.main, 
      size && 'size__' + size,
    )}>
      { props.children }
    </div>
  );
}

export default Padding;
