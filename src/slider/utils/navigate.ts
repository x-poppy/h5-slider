import { Dialog } from "react-vant";
import { isURLsCors } from "./url";

import fixStyles from "./alertStyleFix.module.css";
import { getMessage, I18nMessageBundle, LocaleMessageKey } from "./language";

interface NavigateToOpts {
  i18nMessageBundle?: I18nMessageBundle
  knownHosts?: string[];
  skipSecurityCheck?: boolean;
  mock?: boolean
}

function nativeNavigateTo(url: string, mock: boolean) {
  if (mock) {
    console.log('Mock navigate to ' + url);
    return;
  }
  window.location.href = url;
}

export async function navigateTo(url: string, opts?: NavigateToOpts) {
  const skipSecurityCheck = opts?.skipSecurityCheck ?? false;

  if (skipSecurityCheck) {
    nativeNavigateTo(url, opts?.mock ?? false);
    return;
  }

  if (!isURLsCors(url)) {
    nativeNavigateTo(url, opts?.mock ?? false);
    return;
  }

  let isKnowHost = false;
  if (Array.isArray(opts?.knownHosts)) {
    isKnowHost = opts!.knownHosts.some(host => {
      return url.startsWith(host);
    })
  }
  if (isKnowHost) {
    nativeNavigateTo(url, opts?.mock ?? false);
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

  nativeNavigateTo(url, opts?.mock ?? false);
}
