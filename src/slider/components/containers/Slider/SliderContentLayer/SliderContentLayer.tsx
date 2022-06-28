import React, { ReactElement, useCallback, useMemo } from 'react';
import { Swiper } from 'react-vant';
import { SwiperDuration, useNavigation } from '../../../../hooks/useNavigation';
import { SlideIndexProvider } from '../../../../hooks/useSlideIndex';
import { isCloseTo } from '../../../../utils/math';
import classnames from 'classnames';

import styles from './SliderContentLayer.module.css';
import { useUILock } from '../../../../hooks/useUILock';

interface SliderContentProps {
  swiperRef: any;
  vertical?: boolean;
  slideElements: ReactElement[] | null;
}

function SliderContent(props: SliderContentProps) {
  const slideElements = props.slideElements ?? [];
  const navigation = useNavigation();
  const { locked } = useUILock();

  const onActiveIndexChange = useCallback(
    (index: number) => {
      navigation.onSlideChange(index);
    },
    [navigation],
  )

  const renderSideElements = useMemo(() => {
    return (
      <div className={classnames(styles.main, locked && styles.locked)}>
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
      </div>
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.activeIndex, locked]);

  return renderSideElements;
}

export default SliderContent;
