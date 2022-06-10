import { useCallback, useRef, useState } from "react";
import { SwiperInstance } from "react-vant";

export const SwiperDuration = 300;

export function useSwiperState(initialIndex: number, totalCount: number, cacheSize?: number, onSwiperChange?: (index: number) => void) {
  totalCount = totalCount < 0 ? 0 : totalCount;
  initialIndex = totalCount === 0 ? 0 : (initialIndex > totalCount - 1 ? totalCount - 1: initialIndex);
  cacheSize = cacheSize ?? 2;
  const swiperRef = useRef<SwiperInstance>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const onSwiperChangeHandle = useCallback((targetIndex: number) => {
    if (targetIndex !== activeIndex) {
      // there is bug for swiper, current is start of change, not the end
      setTimeout(()=>{
        setActiveIndex(targetIndex);
        onSwiperChange?.(targetIndex);
      }, SwiperDuration * 0.5);
    }
  }, [activeIndex, onSwiperChange]);

  const swipePrevHandler = useCallback(
    () => {
      swiperRef.current?.swipePrev();
    },
    [],
  )

  const swipeNextHandler = useCallback(
    () => {
      swiperRef.current?.swipeNext();
    },
    [],
  )

  const swipeToHandler = useCallback(
    (index: number) => {
      swiperRef.current?.swipeTo(index);
    },
    [],
  )

  return {
    initialIndex,
    swiperRef,
    activeIndex,
    totalCount,
    cacheSize,
    onActiveIndexChange: onSwiperChangeHandle,
    swipePrev: swipePrevHandler,
    swipeNext: swipeNextHandler,
    swipeTo: swipeToHandler,
  } 
}
