import { useCallback, useRef, useState } from "react";
import { SwiperInstance } from "react-vant";

export function useSwiperState(initialIndex: number) {
  const swiperRef = useRef<SwiperInstance>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const onSwiperChangeHandle = useCallback((targetIndex: number) => {
    if (targetIndex !== activeIndex) {
      setActiveIndex(targetIndex);
    }
  }, [activeIndex]);

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
    swiperRef,
    activeIndex,
    onActiveIndexChange: onSwiperChangeHandle,
    swipePrev: swipePrevHandler,
    swipeNext: swipeNextHandler,
    swipeTo: swipeToHandler,
  } 
}
