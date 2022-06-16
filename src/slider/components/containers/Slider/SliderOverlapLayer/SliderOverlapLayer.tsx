import React, { ReactNode, useCallback } from 'react';
import { useOverlap } from '../../../../hooks/userOverlap';

import styles from './SliderOverlapLayer.module.css'

export interface SliderOverlapLayerProps {
  children?: ReactNode
}

function SliderOverlapLayer(props: SliderOverlapLayerProps) {
  const overlap = useOverlap();
  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      overlap.setOverlap(element);
    },
    [overlap],
  );

  return (
    <div ref={refCallback} className={styles.main}>
      { props.children }
    </div>
  );
}

export default SliderOverlapLayer;
