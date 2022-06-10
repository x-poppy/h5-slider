import { useEffect, useState } from "react";
import { Dialog } from 'react-vant';
import { callback } from "../utils/callback";
import { LocaleMessageKey } from "../utils/language";
import { useI18nMessageBundle } from "./useI18nMessageBundle";

import fixStyles from "../utils/alertStyleFix.module.css";
interface UseAsyncEffectOpts {
  isThrowErr?: boolean;
  valid?: boolean;
}

export function useAsyncEffect(effectCallback?: CallableFunction, deps?: any[], opts?:UseAsyncEffectOpts) {
  const i18nMessageBundle = useI18nMessageBundle();
  
  const isThrowErr = opts?.isThrowErr ?? false; 
  const valid = opts?.valid ?? true;

  deps ??= [];
  const [error, throwError] = useState<any>(null);
  if (error) {
    if (isThrowErr) {
      throw error;
    }
  }

  useEffect(() => {
    if (isThrowErr) {
      return;
    }

    if (!error) {
      return;
    }

    throwError(null);// clear the error
    Dialog.alert({
      message: i18nMessageBundle.getMessage(LocaleMessageKey.ErrorAlertMessage),
      confirmButtonText:  i18nMessageBundle.getMessage(LocaleMessageKey.CommonCloseText),
      className: fixStyles.main,
    });
  }, [error, i18nMessageBundle, isThrowErr]);

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
