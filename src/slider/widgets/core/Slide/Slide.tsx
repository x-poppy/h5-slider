import React, { ReactNode, useMemo, useRef } from 'react';
import { useInViewport } from 'react-vant/es/hooks';
import { useSlideNavigationEffect } from '../../../hooks/useSlideNavigationEffect';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { SliderWidgetProps, SliderEffectReactElement } from '../../../types/UI';

import styles from './Slide.module.css';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

export interface SlideProps extends SliderWidgetProps {
  entryEffect?: SliderEffectReactElement;
  background?: string;
  children?: ReactNode;
}

const EventNames = {
  OnEntrySlide: 'OnEntrySlide',
}

function Slide(props: SlideProps) {
  const ref = useRef<HTMLDivElement>();
  const inViewPort = useInViewport(ref);
  const { activeEffect: activeEntryEffect, openEffect:openEntryEffect } = useEffectElement(props.entryEffect);
  const { isActiveSlide, activeIndex } =  useSlideNavigationEffect();

  useAsyncEffect(async () => {
    await openEntryEffect({
      eventName: EventNames.OnEntrySlide,
      detail: {
        activeIndex
      }
    });
  }, [ isActiveSlide ], false);

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
