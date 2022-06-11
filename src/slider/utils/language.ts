
let isZhLanguage: null | boolean = null ;
export function isZHLanguage() {
  if (isZhLanguage === null) {
    const serchParams = new URLSearchParams(window.location.search);
    const language = (serchParams.get('language') ?? navigator.language ?? 'en');
    isZhLanguage = language.toLowerCase().startsWith('zh');
  }
  return isZhLanguage;
}

export enum LocaleMessageKey {
  CommonCloseText = "CommonCloseText",
  CommonConfirmText = "CommonConfirmText",
  CommonCancelText = "CommonCancelText",
  PageErrorDesc = "PageErrorDesc",
  Refresh = "Refresh",
  PreviousSlide = "PreviousSlide",
  NextSlide = "NextSlide",
  SubmitSlide = "SubmitSlide",
  NavigationAlertTitle = "NavigationAlertTitle",
  NavigationAlertMessage = "NavigationAlertMessage",
  ErrorAlertMessage = "ErrorAlertMessage",
}

const localeMessages = {
  [LocaleMessageKey.CommonCloseText]: {
    zh: '关闭',
    en: 'Close'
  },
  [LocaleMessageKey.CommonConfirmText]: {
    zh: '确认',
    en: 'Confirm'
  },
  [LocaleMessageKey.CommonCancelText]: {
    zh: '取消',
    en: 'Cancel'
  },
  [LocaleMessageKey.PageErrorDesc]: {
    zh: '页面异常, 请您稍后再试！',
    en: 'Page Error! Please Try Again Later!'
  },
  [LocaleMessageKey.Refresh]: {
    zh: '刷新',
    en: 'Refresh'
  },
  [LocaleMessageKey.PreviousSlide]: {
    zh: '上一页',
    en: 'Previous'
  },
  [LocaleMessageKey.NextSlide]: {
    zh: '下一页',
    en: 'Next'
  },
  [LocaleMessageKey.SubmitSlide]: {
    zh: '完成',
    en: 'Submit'
  },
  [LocaleMessageKey.NavigationAlertTitle]: {
    zh: '提醒',
    en: 'Warning'
  },
  [LocaleMessageKey.NavigationAlertMessage]: {
    zh: '即将离开当前页面, 请注意信息安全!',
    en: 'Your\'re ready to leave current page, please pay attention to information security!'
  },
  [LocaleMessageKey.ErrorAlertMessage]: {
    zh: '抱歉, 出错啦～ 请您稍后再试一次',
    en: 'Ops~, Something went wrong. You can try it again later.'
  },
}

export function getMessage(messageKey: LocaleMessageKey) {
  const message = localeMessages[messageKey];
  if (!message) {
    return "";
  }
  
  if (isZHLanguage()) {
    return localeMessages[messageKey].zh;
  } else {
    return localeMessages[messageKey].en;
  }
}

export interface I18nMessageBundle {
  getMessage(messageKey: LocaleMessageKey | string): string;
}

export function createI18nMessageBundle(messages: Record<string, any>): I18nMessageBundle {
  return {
    getMessage(messageKey: LocaleMessageKey | string): string {
      return messages[messageKey] ?? getMessage(messageKey as any);
    }
  }
}
