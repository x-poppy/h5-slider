import React, { cloneElement, ReactElement, useCallback, useState } from "react";
import { SliderEffectElement } from "../types/Element";
import { useNavigation } from "./useNavigation";
import { useVariableScopes } from "./useVariableScopes";

type OpenEffectFunction = (evt: SlideEffectEvent)=> Promise<any>

export function useEffectElement(effectElement?: SliderEffectElement | null): [ReactElement | null, OpenEffectFunction, boolean] {
  const isValid =  React.isValidElement(effectElement);
  const [activeEffectElement, setActiveEffectElement] = useState<ReactElement | null>(isValid ? effectElement : null);
  const navigation = useNavigation();
  const variableScopes = useVariableScopes();
  
  const openEffectHandel: OpenEffectFunction = useCallback(
    async (evt: SlideEffectEvent) => {
      if (!effectElement) {
        return;
      }
      return new Promise((resolve, reject) => {
        variableScopes.pushScope({
          navigation: {
            activeIndex: navigation.activeIndex,
            totalCount: navigation.totalCount,
          },
          event: evt,
        });
        const clonedEffectElement = cloneElement<SliderEffectElement>(effectElement, {
          event: evt,
          onEffectComplete: (err: any, data: any) => {
            if (err) {
              variableScopes.popScope();
              reject(err);
            } else {
              variableScopes.popScope();
              resolve(data ?? undefined);
            }
          },
        })
        setActiveEffectElement(clonedEffectElement);
      })
    },
    // eslint-disable-next-line 
    [],
  );
  return [
    activeEffectElement,
    openEffectHandel,
    isValid,
  ]
}
