import { Dialog } from "react-vant";
import { getNavigationURL, getURL, isRelativeURL } from "./url";

import fixStyles from "./alertStyleFix.module.css";
import { getMessage, I18nMessageBundle, LocaleMessageKey } from "./language";

interface NavigateToOpts {
  searchMatcher?: string | string[],
  i18nMessageBundle?: I18nMessageBundle
  knownHosts?: string[];
  baseURL?: string;
}

export function isCors(href: string, baseURL?: string) {
  if (isRelativeURL(href)) {
    return false;
  }

  if (baseURL) {
    return href.startsWith(baseURL);
  } else {
    return href.startsWith(window.location.origin);
  }
}

export async function navigateTo(href: string, opts?: NavigateToOpts) {
  if (!href) {
    return;
  }

  const transformedHref = getNavigationURL(getURL(href, opts?.baseURL), opts?.searchMatcher);
  if (!isCors(transformedHref, opts?.baseURL)) {
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
  })

  if (!result) {
    return;
  }

  window.location.href = transformedHref;
}
