import React, { ReactNode, useEffect } from 'react';
import { SliderComponentProps } from '../../../types/Component';
import { useSlideIndex } from '../../../hooks/useSlideIndex';
import { SliderEffectElement } from '../../../types/Element';
import { useNavigation } from '../../../hooks/useNavigation';

import styles from './Slide.module.css';
import OverlapLayer from '../../../baseComponents/OverlapLayer';
import { OverlapLayerRefProvider } from '../../../hooks/useOverlapLayerRef';
import { callback } from '../../../utils/callback';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

export interface SlideProps extends SliderComponentProps {
  entryEffect?: SliderEffectElement;
  background?: string;
  children?: ReactNode;
}

const EventNames = {
  OnEntrySlide: 'OnEntrySlide',
}

function Slide(props: SlideProps) {
  const navigation = useNavigation();
  const selfIndex = useSlideIndex();
  const selfIndexActive = navigation.activeIndex === selfIndex;
  const dispatchEffect = useDispatchEffect();

  useEffect(() => {
    if (!selfIndexActive) {
      return;
    }

    if (!props.entryEffect) {
      return;
    }

    callback(async () => {
      await dispatchEffect(props.entryEffect!, {
        eventName: EventNames.OnEntrySlide,
        detail: {
          activeIndex: selfIndex
        }
      });
    })
  }, [dispatchEffect, props.entryEffect, selfIndex, selfIndexActive])

  return (
    <div style={{background: props.background}} className={styles.main}>
      <OverlapLayerRefProvider>
        { props.children }
        <OverlapLayer />
      </OverlapLayerRefProvider>
    </div>
  );
}

export default Slide;
