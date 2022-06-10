import React, { ReactNode, useContext, useMemo } from "react";
import { noop } from "../utils/noop";
import { Navigation, useNavigation } from "./useNavigation";

export interface NavigationItem extends Navigation {
  index: number;
  active: boolean;
}

const NavigationItemContext = React.createContext<NavigationItem>({
  index: 0,
  active: false,
  initialIndex: 0,
  activeIndex: 0,
  totalCount: 0,
  cacheSize: 0,
  preSlide: noop,
  nextSlide: noop,
  gotoSlide: noop as any,
})

export interface NavigationItemContextProviderProps {
  index: number;
  children?: ReactNode;
}
export function NavigationItemProvider(props: NavigationItemContextProviderProps) {
  const navigation = useNavigation()
  const apiInstance = useMemo<NavigationItem>(() => {
    return {
      ...navigation,
      active: navigation.activeIndex === props.index,
      index: props.index
    }
  }, [navigation, props.index]);
  return (
    <NavigationItemContext.Provider value={apiInstance}>
      { props.children }
    </NavigationItemContext.Provider>
  );
}

export function useNavigationItem() {
  return useContext(NavigationItemContext);
}
