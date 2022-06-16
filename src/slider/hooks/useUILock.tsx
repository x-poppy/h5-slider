import React, { ReactNode, useContext, useMemo, useState } from "react";
import { noop } from "../utils/noop";

const UILockContext = React.createContext({
  lock: noop,
  unlock: noop,
  locked: false,
});

interface UILockProviderProps {
  children?: ReactNode;
}

export function UILockProvider(props: UILockProviderProps) {
  const [lockCount, setLockCount] = useState(0);

  const inst = useMemo(() => {
    return {
      locked: lockCount > 0,
      lock: () => {
        setLockCount((count)=> count + 1);
      },
      unlock: () => {
        setLockCount((count)=> count - 1);
      }
    };
  }, [lockCount]);

  return (
    <UILockContext.Provider value={inst}>
      { props.children }
    </UILockContext.Provider>
  );
}

export function useUILock() {
  return useContext(UILockContext)
}
