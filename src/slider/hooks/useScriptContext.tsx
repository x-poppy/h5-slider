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
  emit(eventName: string, payload?: Record<string, any>): CustomEvent;
  [x: string]: any
}

const ScriptContext = React.createContext<ScriptContextAPI>({
  on: noop,
  once: noop,
  off: noop,
  emit: noop as any,
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
    eventTargetExtends.emit = (eventName: string, payload?: Record<string, any>) => {
      const event = new CustomEvent(eventName, {
        detail: {
          payload,
          timestamp: new Date().toISOString(),
        },
      });
      try {
        eventTarget.dispatchEvent(event);
      } catch (err) {
        throwError(err as any);
      }
      return event;
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
