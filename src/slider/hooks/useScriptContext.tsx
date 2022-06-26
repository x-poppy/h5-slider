import React, { useContext, useMemo } from "react";
import { ReactNode } from "react";
import { noop } from "../utils/noop";
import { useThrowError } from "./useThrow";

export const EventNames = {
  OnStoreDataLoaded: "onStoreDataLoaded",
  OnSchemaInitial: "onSchemaInitial",
  OnLoaded: "onLoaded",
  OnCallFunction: "onCallFunction",
}

interface ScriptContextAPI {
  on(event: string, callback: EventListener): () => void;
  once(event: string, callback: EventListener): void;
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
  const throwError = useThrowError();
  const inst = useMemo(() => {
    const eventTarget = new EventTarget();
    const eventTargetExtends = (new EventTarget() as unknown as ScriptContextAPI);
    eventTargetExtends.on = (eventName: string, callback: EventListener) => {
      const innerCallback = (evt: Event) => {
        try {
          // eslint-disable-next-line no-debugger
          debugger;
          callback(evt);
        } catch(err) {
          // eslint-disable-next-line no-debugger
          debugger;
        }
      };
      eventTarget.addEventListener(eventName, innerCallback);
      return () => {
        eventTarget.removeEventListener(eventName, innerCallback);
      }
    }
    eventTargetExtends.once = (eventName: string, callback: EventListener) => {
      const onceCallback: EventListener = (event: Event) => {
        eventTarget.removeEventListener(event.type, onceCallback);
        try {
          callback(event);
        } catch(err) {
          throwError(err as any);
        }
      }
      eventTarget.addEventListener(eventName, onceCallback);
    }
    eventTargetExtends.off = (eventName: string, callback: EventListener) => {
      eventTarget.removeEventListener(eventName, callback);
    }
    eventTargetExtends.emit = (event: Event) => {
      try {
        eventTarget.dispatchEvent(event);
      } catch (err) {
        throwError(err as any);
      }
    }
    return eventTargetExtends;
  }, [throwError]);
  
  return (
    <ScriptContext.Provider value={inst}>
      { props.children }
    </ScriptContext.Provider>
  );
}

export function useScriptContext() {
  return useContext(ScriptContext);
}
