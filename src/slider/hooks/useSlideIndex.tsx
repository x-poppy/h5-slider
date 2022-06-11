import React, { ReactNode, useContext } from "react";

const SlideIndexContext = React.createContext<number>(0)

export interface NavigationItemContextProviderProps {
  index: number;
  children?: ReactNode;
}
export function SlideIndexProvider(props: NavigationItemContextProviderProps) {
  return (
    <SlideIndexContext.Provider value={props.index}>
      { props.children }
    </SlideIndexContext.Provider>
  );
}

export function useSlideIndex() {
  return useContext(SlideIndexContext);
}
