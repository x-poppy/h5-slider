import React, { ReactElement, useCallback, useMemo } from 'react';
import { Swiper } from 'react-vant';
import { SwiperDuration, useNavigation } from '../../../../../hooks/useNavigation';
import { SlideIndexProvider } from '../../../../../hooks/useSlideIndex';
import { isCloseTo } from '../../../../../utils/math';

import styles from './SliderContentLayer.module.css';

interface SliderContentProps {
  swiperRef: any;
  vertical?: boolean;
  slideElements: ReactElement[] | null;
}

function SliderContent(props: SliderContentProps) {
  const slideElements = props.slideElements ?? [];
  const navigation = useNavigation();

  const onActiveIndexChange = useCallback(
    (index: number) => {
      navigation.onSlideChange(index);
    },
    [navigation],
  )

  const renderSideElements = useMemo(() => {
    return (
      <>
        <Swiper
          ref={props.swiperRef}
          initialSwipe={navigation.initialIndex}
          className={styles.swiper}
          loop={false}
          duration={SwiperDuration}
          touchable={false}
          vertical={props.vertical}
          indicator={false}
          onChange={onActiveIndexChange}
        >
          {slideElements!.map((slideElement, index) => {
            return (
              <Swiper.Item key={index}>
                <SlideIndexProvider index={index}>
                  { isCloseTo(index, navigation.activeIndex, navigation.cacheSize) ? slideElement : null }
                </SlideIndexProvider>
              </Swiper.Item>
            );
          })}
        </Swiper>
      </>
    );
  // eslint-disable-next-line 
  }, [navigation.activeIndex]);

  return renderSideElements;
}

export default SliderContent;
