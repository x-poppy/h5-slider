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

interface DispatchEffectOpts {
  popupError?: boolean;
}

export function useDispatchEffect() {
  const i18nMessageBundle = useI18nMessageBundle();
  const navigation = useNavigation();
  const variableScopes = useVariableScopes();
  const store = useStore();
  const httpClient = useHttpClient();

  const dispatch = useCallback(
    async (effectElement:SliderEffectElement, event: SlideEffectEvent, opts?: DispatchEffectOpts) => {
      if (!effectElement) {
        return;
      }

      const popupError = opts?.popupError ?? true;

      variableScopes.pushScope({
        navigation: {
          activeIndex: navigation.activeIndex,
          totalCount: navigation.totalCount,
        },
        event,
      });

      const props = {
        ...effectElement,
        variableScopes,
        i18nMessageBundle,
        store,
        httpClient,
        event,
      };

      try {
        const results = await props.$$effect(props);
        variableScopes.popScope();
        return results;
      } catch (error) {
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