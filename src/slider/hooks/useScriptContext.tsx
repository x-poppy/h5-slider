import React, { useContext, useMemo } from "react";
import { ReactNode } from "react";
import { noop } from "../utils/noop";

interface ScriptContextAPI {
  on(event: string, callback: EventListener): void;
  once(event: string, callback: EventListener): void;
  off(event: string, callback: EventListener): void;
  emit(event: Event): void;
  [x: string]: any
}

const ScriptContext = React.createContext<ScriptContextAPI>({
  on: noop,
  once: noop,
  off: noop,
  emit: noop,
});

interface ScriptContextProviderProps {
  children?: ReactNode;
}

export function ScriptContextProvider(props: ScriptContextProviderProps) {
  const inst = useMemo(() => {
    const eventTarget = new EventTarget();
    const eventTargetExtends = (new EventTarget() as unknown as ScriptContextAPI);
    eventTargetExtends.on = (eventName: string, callback: EventListener) => {
      eventTarget.addEventListener(eventName, callback);
    }
    eventTargetExtends.once = (eventName: string, callback: EventListener) => {
      const onceCallback: EventListener = (event: Event) => {
        eventTarget.removeEventListener(event.type, onceCallback);
        callback(event);
      }
      eventTarget.addEventListener(eventName, onceCallback);
    }
    eventTargetExtends.off = (eventName: string, callback: EventListener) => {
      eventTarget.removeEventListener(eventName, callback);
    }
    eventTargetExtends.emit = (event: Event) => {
      eventTarget.dispatchEvent(event);
    }
    return eventTargetExtends;
  }, []);
  
  return (
    <ScriptContext.Provider value={inst}>
      { props.children }
    </ScriptContext.Provider>
  );
}

export function useScriptContext() {
  return useContext(ScriptContext);
}
