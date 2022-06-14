import React, { ReactNode, useMemo } from 'react';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Float.module.css';

export interface FloatProps extends SliderComponentProps {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  transform?: string;
  zIndex?: number;
  children?: ReactNode;
}

function Float(props: FloatProps) {
  const floatStyles = useMemo(() => {
    return {
      left: props.left,
      right: props.right,
      top: props.top,
      bottom: props.bottom,
      transform: props.transform,
      zIndex: props.zIndex,
    };
  }, []);

  return (
    <div className={styles.main} style={floatStyles}>
      { props.children }
    </div>
    );
}

export default Float;
