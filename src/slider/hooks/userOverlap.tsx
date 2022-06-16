import React, { ReactNode, useContext, useMemo, useState } from "react";
import { noop } from "../utils/noop";


interface OverlapAPI {
  overlap: HTMLElement | null,
  setOverlap(val: HTMLElement | null): void;
}

const OverlapContext = React.createContext<OverlapAPI>({
  overlap: null,
  setOverlap: noop,
});

interface OverlapProviderProps {
  children?: ReactNode;
}

export function OverlapProvider(props: OverlapProviderProps) {
  const [overlap, setOverlap] = useState<HTMLElement | null>(null);
  const apiInst = useMemo(() => {
    return {
      overlap,
      setOverlap,
    }
  }, [overlap]);

  return (
    <OverlapContext.Provider value={apiInst}>
      { props.children }
    </OverlapContext.Provider>
  );
}

export function useOverlap() {
  return useContext(OverlapContext)
}
