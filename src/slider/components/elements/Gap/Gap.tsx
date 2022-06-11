import React from 'react';
import classnames from 'classnames';
import { SliderWidgetProps } from '../../../types/Widget';

import styles from './Gap.module.css';

export interface GapProps extends SliderWidgetProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
}

function Gap(props: GapProps) {
  const size = props.size ?? 'md';
  return (
    <div className={classnames(styles.main, 
      size && 'size__' + size,
    )}>
    </div>
  );
}

export default Gap;
