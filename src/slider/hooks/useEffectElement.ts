import React, { cloneElement, ReactElement, useCallback, useState } from "react";
import { SliderEffectElement } from "../types/Element";
import { useI18nMessageBundle } from "./useI18nMessageBundle";
import { useNavigation } from "./useNavigation";
import { useVariableScopes } from "./useVariableScopes";
import { Dialog } from "react-vant";
import { LocaleMessageKey } from "../utils/language";

import fixStyles from "../utils/alertStyleFix.module.css";

type OpenEffectFunction = (evt: SlideEffectEvent, handleError?: boolean)=> Promise<any>

export function useEffectElement(effectElement?: SliderEffectElement | null): [ReactElement | null, OpenEffectFunction, boolean] {
  const i18nMessageBundle = useI18nMessageBundle();
  const isValid =  React.isValidElement(effectElement);
  const [activeEffectElement, setActiveEffectElement] = useState<ReactElement | null>(isValid ? effectElement : null);
  const navigation = useNavigation();
  const variableScopes = useVariableScopes();
  
  const openEffectHandel: OpenEffectFunction = useCallback(
    async (evt: SlideEffectEvent, popupError?: boolean) => {
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
              if (popupError) {
                Dialog.alert({
                  message: i18nMessageBundle.getMessage(LocaleMessageKey.ErrorAlertMessage),
                  confirmButtonText:  i18nMessageBundle.getMessage(LocaleMessageKey.CommonCloseText),
                  className: fixStyles.main,
                });
              }
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
