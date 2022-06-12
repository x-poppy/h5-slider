import React, { ReactNode, useRef } from 'react';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderComponentProps } from '../../../types/Component';

import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useSlideIndex } from '../../../hooks/useSlideIndex';
import { SliderEffectElement } from '../../../types/Element';
import { useNavigation } from '../../../hooks/useNavigation';

import styles from './Slide.module.css';
import OverlapLayer from '../../../baseComponents/OverlapLayer';
import { OverlapLayerRefProvider } from '../../../hooks/useOverlapLayerRef';

export interface SlideProps extends SliderComponentProps {
  entryEffect?: SliderEffectElement;
  background?: string;
  children?: ReactNode;
}

const EventNames = {
  OnEntrySlide: 'OnEntrySlide',
}

function Slide(props: SlideProps) {
  const [activeEntryEffect, openEntryEffect, isValidEntryEffect] = useEffectElement(props.entryEffect);
  const navigation = useNavigation();
  const selfIndex = useSlideIndex();
  const selfIndexActive = navigation.activeIndex === selfIndex;

  useAsyncEffect(async () => {
    await openEntryEffect({
      eventName: EventNames.OnEntrySlide,
      detail: {
        activeIndex: selfIndex
      }
    });
  }, [selfIndexActive], {
    valid: selfIndexActive && isValidEntryEffect
  });

  return (
    <div onClick={props.onClick} style={{background: props.background}} className={styles.main}>
      <OverlapLayerRefProvider>
        { props.children }
        <OverlapLayer>
          { activeEntryEffect }
        </OverlapLayer>
      </OverlapLayerRefProvider>
    </div>
  );
}

export default Slide;
