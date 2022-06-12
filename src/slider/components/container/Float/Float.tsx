import React, { ReactNode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useOverlapLayerRef } from '../../../hooks/useOverlapLayerRef';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Float.module.css';

export interface FloatProps extends SliderComponentProps {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  zIndex?: number;
  children?: ReactNode;
}

function Float(props: FloatProps) {
  const overlapRef = useOverlapLayerRef();

  const floatStyles = useMemo(() => {
    return {
      left: props.left,
      right: props.right,
      top: props.top,
      bottom: props.bottom,
      zIndex: props.zIndex,
    };
  }, [props.bottom, props.left, props.right, props.top, props.zIndex]);

  if (!overlapRef.current) {
    return null;
  }

  return ReactDOM.createPortal((
    <div className={styles.main} 
      style={floatStyles}>
      { props.children }
    </div>
  ), overlapRef.current);
}

export default Float;
