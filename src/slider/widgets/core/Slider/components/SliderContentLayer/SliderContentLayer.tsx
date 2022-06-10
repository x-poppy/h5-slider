import React, { ReactElement, useMemo } from 'react';
import { Swiper } from 'react-vant';
import { useNavigation } from '../../../../../hooks/useNavigation';
import { NavigationItemProvider } from '../../../../../hooks/useNavigationItem';
import { SwiperDuration } from '../../../../../hooks/useSwiperState';
import { isCloseTo } from '../../../../../utils/math';

import styles from './SliderContentLayer.module.css';

interface SliderContentProps {
  swiperRef: any;
  vertical?: boolean;
  onActiveIndexChange: (index: number) => void;
  slideElements: ReactElement[] | null;
}

function SliderContent(props: SliderContentProps) {
  const slideElements = props.slideElements ?? [];
  const navigation = useNavigation();

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
          onChange={props.onActiveIndexChange}
        >
          {slideElements!.map((slideElement, index) => {
            return (
              <Swiper.Item key={index}>
                <NavigationItemProvider index={index}>
                  { isCloseTo(index, navigation.activeIndex, navigation.cacheSize - 1) ? slideElement : null }
                </NavigationItemProvider>
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
