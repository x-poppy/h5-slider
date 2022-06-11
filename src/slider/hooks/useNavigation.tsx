import React, { MutableRefObject, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import { SwiperInstance } from "react-vant";
import { limitNumer } from "../utils/math";
import { noop } from "../utils/noop";

export const SwiperDuration = 300;

export interface Navigation {
  initialIndex: number,
  activeIndex: number;
  totalCount: number;
  cacheSize: number;
  preSlide: () => void;
  nextSlide: () => void;
  gotoSlide: (index: number) => void;
  onSlideChange: (index: number) => void;
}

const NavigationReactContext = React.createContext<Navigation>({
  initialIndex: 0,
  activeIndex: 0,
  totalCount: 0,
  cacheSize: 0,
  preSlide: noop,
  nextSlide: noop,
  gotoSlide: noop as any,
  onSlideChange: noop as any,
});

interface NavigationProviderProps {
  swiperRef: any;
  initialIndex: number,
  totalCount: number, 
  cacheSize?: number
  children?: ReactNode
}
export function NavigationProvider(props: NavigationProviderProps) {
  const totalCount = props.totalCount;
  const initialIndex = limitNumer(props.initialIndex, 0, totalCount - 1);
  const cacheSize = props.cacheSize ?? 1;

  const [activeIndex, setActiveIndex] = useState(props.initialIndex);

  const preSlide = useCallback(
    () => {
      props.swiperRef.current?.swipePrev();
    },
    [props.swiperRef],
  )

  const nextSlide = useCallback(
    () => {
      props.swiperRef.current?.swipeNext();
    },
    [props.swiperRef],
  );

  const gotoSlide = useCallback(
    (index: number) => {
      props.swiperRef.current?.swipeTo(index);
    },
    [props.swiperRef],
  );

  const onSlideChange = useCallback((index: number) => {
    if (activeIndex === index) {
      return;
    }
    // do some delay
    setTimeout(()=>{
      setActiveIndex(index);
    }, SwiperDuration * 0.5);
  }, [activeIndex]);
  
  const api = useMemo(() => {
    return {
      initialIndex,
      activeIndex,
      totalCount,
      cacheSize,
      preSlide,
      nextSlide,
      gotoSlide,
      onSlideChange,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <NavigationReactContext.Provider value={api}>
      { props.children }
    </NavigationReactContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationReactContext)
}
