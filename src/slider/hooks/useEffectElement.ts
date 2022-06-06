import { cloneElement, ReactNode, useCallback, useState } from "react";
import { SlideEffectEvent, SliderEffectReactElement } from "../types/UI";
import { useSliderContext } from "../utils/SliderContext";

export function useEffectElement(effectElement?: SliderEffectReactElement | null) {
  const [activeEffectElement, setActiveEffectElement] = useState<ReactNode>(null);
  const sliderContext =  useSliderContext();
  const openEffect = useCallback(
    async (evt: SlideEffectEvent) => {
      if (!effectElement || activeEffectElement) {
        return;
      }
      return new Promise((resolve, reject) => {
        sliderContext.variableScopeManager.pushScope({
          event: evt
        });
        const clonedEffectElement = cloneElement<SliderEffectReactElement>(effectElement, {
          event: evt,
          onEffectComplete: (err: any, data: any) => {
            setActiveEffectElement(null);
            if (err) {
              sliderContext.variableScopeManager.popScope();
              reject(err);
            } else {
              sliderContext.variableScopeManager.popScope();
              resolve(data ?? undefined);
            }
          },
        })
        setActiveEffectElement(clonedEffectElement);
      })
    },
    [activeEffectElement, effectElement, sliderContext.variableScopeManager],
  )

  return {
    openEffect,
    activeEffect: activeEffectElement,
  }
}
