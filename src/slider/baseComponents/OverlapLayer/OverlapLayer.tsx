import React, { ReactNode } from 'react';
import { useOverlapLayerRef } from '../../hooks/useOverlapLayerRef';

import styles from './OverlapLayer.module.css';

export interface OverlapLayerProps {
  children?: ReactNode;
}

function OverlapLayer(props: OverlapLayerProps) {
  const ref = useOverlapLayerRef();
  return (
    <div ref={ref as any} className={styles.main}>
      { props.children }
    </div>
  );
}

export default OverlapLayer;
