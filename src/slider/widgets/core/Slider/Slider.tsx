import React, { ReactElement, useMemo } from 'react';
import { Swiper } from 'react-vant';
import { SliderContextProvider } from '../../../utils/SliderContext';

import styles from './Slider.module.css';
import { SliderWidgetProps, SliderEffectReactElement } from '../../../types/UI';
import { NavigationItemContextProvider } from '../../../utils/NavigationItemContext';
import { isCloseTo } from '../../../utils/math';
import { useSliderTitleEffect } from '../../../hooks/useSliderTitleEffect';
import { useSwiperState } from '../../../hooks/useSwiperState';
import { useEffectElement } from '../../../hooks/useEffectElement';

export interface SliderProps extends SliderWidgetProps {
  slideIndex?: number;
  slideCacheSize?: number;
  initialEffect?: SliderEffectReactElement;
  children?: ReactElement[];
}

// https://swiperjs.com/swiper-api
function Slider(props: SliderProps) {
  // initial props
  const slideElements = props.children;
  const slideCacheSize = props.slideCacheSize ?? 2;
  const slideTotalCount = slideElements?.length ?? 0;
  const sliderSchema = props.$$schema;
  const slideIndex = (props.slideIndex ?? 0) > slideTotalCount - 1 ? slideTotalCount - 1: (props.slideIndex ?? 0);
  const hasAnySlides = slideTotalCount > 0;

  useSliderTitleEffect(sliderSchema);
  const swiperState = useSwiperState(slideIndex);

  useEffectElement(props.initialEffect)

  const renderSideElements = useMemo(() => {
    if (!hasAnySlides) {
      return null;
    }
    return (
      <Swiper
        ref={swiperState.swiperRef}
        initialSwipe={slideIndex}
        className={styles.swiper}
        loop={false}
        touchable={false}
        indicator={false}
        onChange={swiperState.onActiveIndexChange}
      >
        {slideElements!.map((slideElement, slideIndex) => {
          return (
            <Swiper.Item key={slideIndex}>
              <NavigationItemContextProvider index={slideIndex}>
                { isCloseTo(slideIndex, swiperState.activeIndex, slideCacheSize) ? slideElement : null }
              </NavigationItemContextProvider>
            </Swiper.Item>
          );
        })}
      </Swiper>
    );
  }, [hasAnySlides, slideCacheSize, slideElements, slideIndex, swiperState.activeIndex, swiperState.onActiveIndexChange, swiperState.swiperRef])

  return (
    <SliderContextProvider
      preSlide={swiperState.swipePrev}
      nextSlide={swiperState.swipeNext}
      gotoSlide={swiperState.swipeTo}
      activeIndex={swiperState.activeIndex} 
      totalCount={slideTotalCount} 
      sliderSchema={sliderSchema}
    >
      <div className={styles.main}>
      { renderSideElements }
      <div className={styles.overlaps}>{props.initialEffect}</div>
    </div>
    </SliderContextProvider>
  );
}

export default Slider;
