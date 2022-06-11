import { useEffect, useState } from "react";
import { Dialog } from "react-vant";
import { callback } from "../utils/callback";
import { useI18nMessageBundle } from "./useI18nMessageBundle";

import fixStyles from "../utils/alertStyleFix.module.css";
import { LocaleMessageKey } from "../utils/language";

interface UseAsyncEffectOpts {
  // false is only use for slider initialEffect, and is's en
  popupError?: boolean;
  valid?: boolean;
}

export function useAsyncEffect(effectCallback?: CallableFunction, deps?: any[], opts?:UseAsyncEffectOpts) {
  const i18nMessageBundle = useI18nMessageBundle();
  const ignoreError = opts?.popupError === undefined;
  const isPopupError = opts?.popupError ?? false;
  const valid = opts?.valid ?? true;

  deps ??= [];
  const [error, throwError] = useState<any>(null);
  if (error && !ignoreError && !isPopupError) {
    throw error;
  }

  useEffect(() => {
    if (!error) {
      return;
    }
    if (ignoreError) {
      return;
    }
    if (!isPopupError) {
      return;
    }
    
    Dialog.alert({
      message: i18nMessageBundle.getMessage(LocaleMessageKey.ErrorAlertMessage),
      confirmButtonText:  i18nMessageBundle.getMessage(LocaleMessageKey.CommonCloseText),
      className: fixStyles.main,
    });
  }, [error, i18nMessageBundle, ignoreError, isPopupError])

  useEffect(() => {
    if (!effectCallback) {
      return;
    }

    if (!valid) {
      return;
    }
    
    callback(async () => {
      try {
        await effectCallback();
      } catch (err) {
        throwError(err);
      }
    });
  // eslint-disable-next-line 
  }, [...deps]);
}
