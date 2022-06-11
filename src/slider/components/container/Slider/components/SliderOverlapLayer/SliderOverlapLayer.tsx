import React, { ReactNode } from 'react';
import { useSliderSchema } from '../../../../../hooks/userSliderSchema';
import { useSlideIndxWithStoreEffect } from '../../../../../hooks/useSlideIndxWithStoreEffect';
import { useSliderHTMLEffect } from '../../../../../hooks/useSliderHTMLEffect';

import styles from './SliderOverlapLayer.module.css';

interface SliderOverlapProps {
  children?: ReactNode;
}

function SliderOverlapLayer(props: SliderOverlapProps) {
  const sliderSchema = useSliderSchema();
  useSliderHTMLEffect(sliderSchema);
  useSlideIndxWithStoreEffect();

  return (
    <div className={styles.main}>
      { props.children }
    </div>
  );
}

export default SliderOverlapLayer;
