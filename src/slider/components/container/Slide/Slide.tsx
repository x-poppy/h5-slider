import React, { ReactNode, useMemo, useRef } from 'react';
import { useInViewport } from 'react-vant/es/hooks';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderWidgetProps } from '../../../types/Widget';

import styles from './Slide.module.css';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useSlideIndex } from '../../../hooks/useSlideIndex';
import { SliderEffectElement } from '../../../types/Element';
import { useNavigation } from '../../../hooks/useNavigation';

export interface SlideProps extends SliderWidgetProps {
  entryEffect?: SliderEffectElement;
  background?: string;
  children?: ReactNode;
}

const EventNames = {
  OnEntrySlide: 'OnEntrySlide',
}

function Slide(props: SlideProps) {
  const ref = useRef<HTMLDivElement>();
  const inViewPort = useInViewport(ref);

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

  const renderContent = useMemo(() => {
    if (!inViewPort) {
      return null;
    }
    return props.children;
  }, [inViewPort, props.children]);

  return (
    <div ref={ref as any} onClick={props.onClick} style={{background: props.background}} className={styles.main}>
      { renderContent }
      { activeEntryEffect }
    </div>
  );
}

export default Slide;
