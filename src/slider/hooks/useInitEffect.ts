import { useRef } from "react";

export function useInitEffect(init: CallableFunction) {
  const refs = useRef({initialized: false});
  if (!refs.current.initialized) {
    init();
    refs.current.initialized = true;
  }
}
