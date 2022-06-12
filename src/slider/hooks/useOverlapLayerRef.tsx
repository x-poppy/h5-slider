import React, { ReactNode, useContext, useRef } from "react";

const OverlapLayerRefContext = React.createContext<React.RefObject<HTMLElement>>(React.createRef());

export interface OverlapLayerRefProviderProps {
  children?: ReactNode;
}
export function OverlapLayerRefProvider(props: OverlapLayerRefProviderProps) {
  const ref = useRef<HTMLElement>();  
  return (
    <OverlapLayerRefContext.Provider value={ref as any}>
      { props.children }
    </OverlapLayerRefContext.Provider>
  );
}

export function useOverlapLayerRef() {
  return useContext(OverlapLayerRefContext);
}
