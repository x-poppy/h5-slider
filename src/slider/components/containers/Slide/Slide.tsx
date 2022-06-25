import React, { ReactNode, useEffect, useMemo } from 'react';
import { SliderComponentProps } from '../../../types/Component';
import { useSlideIndex } from '../../../hooks/useSlideIndex';
import { SliderEffectElement } from '../../../types/Element';
import { useNavigation } from '../../../hooks/useNavigation';

import { callback } from '../../../utils/callback';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

import styles from './Slide.module.css';

export interface SlideProps extends SliderComponentProps {
  entryEffect?: SliderEffectElement;
  background?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
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
    if (!props.entryEffect) {
      return;
    }
    
    if (!selfIndexActive) {
      return;
    }

    if (selfIndex < navigation.lastActiveIndex) {
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
  }, [dispatchEffect, navigation.lastActiveIndex, props.entryEffect, selfIndex, selfIndexActive])

  const initStyle = useMemo(() => ({
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
    background: props.background,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);
  
  return (
    <div style={initStyle} className={styles.main}>
      { props.children }
    </div>
  );
}

export default Slide;
