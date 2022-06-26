import { useCallback } from "react"
import { Dialog } from "react-vant";
import { useI18nMessageBundle } from "./useI18nMessageBundle";
import { useNavigation } from "./useNavigation";
import { useVariableScopes } from "./useVariableScopes";

import fixStyles from "../utils/alertStyleFix.module.css";
import { LocaleMessageKey } from "../utils/language";
import { SliderEffectElement } from "../types/Element";
import { useStore } from "./useStore";
import { useHttpClient } from "./useHttpClient";
import { useUILock } from "./useUILock";
import { isEffectElement } from "../utils/typeDetect";
import { useInitialConfig } from "./useInitialConfig";
import { useScriptContext } from "./useScriptContext";

interface DispatchEffectOpts {
  popupError?: boolean;
}

export function useDispatchEffect() {
  const i18nMessageBundle = useI18nMessageBundle();
  const navigation = useNavigation();
  const variableScopes = useVariableScopes();
  const store = useStore();
  const httpClient = useHttpClient();
  const screenLock = useUILock();
  const initialConfig = useInitialConfig();
  const scriptContext = useScriptContext();

  const dispatch = useCallback(
    async (effectElement:SliderEffectElement, event: SlideEffectInitEvent, opts?: DispatchEffectOpts) => {
      if (!isEffectElement(effectElement)) {
        return;
      }

      const popupError = opts?.popupError ?? true;
      const contextEvent: SlideEffectEvent = {
        eventName: event.eventName,
        eventTimeStamp: Date.now(),
        detail: {
          ...event.detail
        },
      };

      variableScopes.pushScope({
        navigation: {
          activeIndex: navigation.activeIndex,
          totalCount: navigation.totalCount,
        },
        event: contextEvent,
      });

      const props = {
        ...effectElement,
        event: contextEvent,
        context: {
          initialConfig,
          variableScopes,
          i18nMessageBundle,
          navigation,
          store,
          httpClient,
          screenLock,
          scriptContext,
        }
      };

      try {
        const results = await props.$$effect(props);
        variableScopes.popScope();
        return results;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        if (popupError) {
          Dialog.alert({
            message: i18nMessageBundle.getMessage(LocaleMessageKey.ErrorAlertMessage),
            confirmButtonText:  i18nMessageBundle.getMessage(LocaleMessageKey.CommonCloseText),
            className: fixStyles.main,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return dispatch;
}
