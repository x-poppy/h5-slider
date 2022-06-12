import { Dialog } from "react-vant";
import { getNavigationURL, getURL, isRelativeURL } from "./url";

import fixStyles from "./alertStyleFix.module.css";
import { getMessage, I18nMessageBundle, LocaleMessageKey } from "./language";

interface NavigateToOpts {
  searchMatcher?: string | string[],
  i18nMessageBundle?: I18nMessageBundle
  knownHosts?: string[];
  baseURL?: string;
  onClose?: () => void;
}

export function isCors(href: string, baseURL?: string) {
  if (isRelativeURL(href)) {
    return false;
  }

  const targetUrl = new URL(href);
  const currentUrl = baseURL ? new URL(baseURL): window.location;
  return targetUrl.origin !== currentUrl.origin;
}

export async function navigateTo(href: string, opts?: NavigateToOpts) {
  if (!href) {
    return;
  }

  const transformedHref = getNavigationURL(getURL(href, opts?.baseURL), opts?.searchMatcher);
  if (!isCors(transformedHref, opts?.baseURL)) {
    opts?.onClose?.();
    window.location.href = transformedHref;
    return;
  }

  let isKnowHost = false;
  if (Array.isArray(opts?.knownHosts)) {
    isKnowHost = opts!.knownHosts.some(host => {
      return transformedHref.startsWith(host);
    })
  }
  if (isKnowHost) {
    opts?.onClose?.();
    window.location.href = transformedHref;
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
    onClose: opts?.onClose
  })

  if (!result) {
    return;
  }

  window.location.href = transformedHref;
}
