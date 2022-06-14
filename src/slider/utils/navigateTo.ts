import { Dialog } from "react-vant";
import { getURLWithQueryString, isURLsCors } from "./url";

import fixStyles from "./alertStyleFix.module.css";
import { getMessage, I18nMessageBundle, LocaleMessageKey } from "./language";
import { isPlainObject } from "./typeDetect";
import { getProperty, hasProperty } from "dot-prop";

interface NavigateToOpts {
  searchMatcher?: string | string[];
  dataPath?: string;
  i18nMessageBundle?: I18nMessageBundle
  knownHosts?: string[];
  skipSecurityCheck?: boolean;
}

export async function navigateTo(url: string, opts?: NavigateToOpts) {
  const skipSecurityCheck = opts?.skipSecurityCheck ?? false;

  url = getURLWithQueryString(url, opts?.searchMatcher);
  if (skipSecurityCheck) {
    window.location.href = url;
    return;
  }

  if (!isURLsCors(url)) {
    window.location.href = url;
    return;
  }

  let isKnowHost = false;
  if (Array.isArray(opts?.knownHosts)) {
    isKnowHost = opts!.knownHosts.some(host => {
      return url.startsWith(host);
    })
  }
  if (isKnowHost) {
    window.location.href = url;
    return;
  }

  const i18nMessageBundle = opts?.i18nMessageBundle ?? {
    getMessage
  }

  const result = await Dialog.alert({
    title: i18nMessageBundle.getMessage(LocaleMessageKey.NavigationAlertTitle),
    message: i18nMessageBundle.getMessage(LocaleMessageKey.NavigationAlertMessage),
    confirmButtonText: i18nMessageBundle.getMessage(LocaleMessageKey.CommonConfirmText),
    cancelButtonText: i18nMessageBundle.getMessage(LocaleMessageKey.CommonCancelText),
    showCancelButton: true,
    className: fixStyles.main,
  })

  if (!result) {
    return;
  }

  window.location.href = url;
}
