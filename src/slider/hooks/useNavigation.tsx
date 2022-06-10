import React, { ReactNode, useContext, useMemo } from "react";
import { noop } from "../utils/noop";
import { useSwiperState } from "./useSwiperState";

export interface Navigation {
  initialIndex: number,
  activeIndex: number;
  totalCount: number;
  cacheSize: number;
  preSlide: () => void;
  nextSlide: () => void;
  gotoSlide: (index: number) => void;
}

const NavigationReactContext = React.createContext<Navigation>({
  initialIndex: 0,
  activeIndex: 0,
  totalCount: 0,
  cacheSize: 0,
  preSlide: noop,
  nextSlide: noop,
  gotoSlide: noop as any,
});

interface NavigationProviderProps {
  swiperState: ReturnType<typeof useSwiperState>
  children?: ReactNode
}
export function NavigationProvider(props: NavigationProviderProps) {
  const api = useMemo(() => {
    const swiperState = props.swiperState;
    return {
      initialIndex: swiperState.initialIndex,
      activeIndex: swiperState.activeIndex,
      totalCount: swiperState.totalCount,
      cacheSize: swiperState.cacheSize,
      preSlide: swiperState.swipePrev,
      nextSlide: swiperState.swipeNext,
      gotoSlide: swiperState.swipeTo,
    }
  }, [props.swiperState])

  return (
    <NavigationReactContext.Provider value={api}>
      { props.children }
    </NavigationReactContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationReactContext)
}
