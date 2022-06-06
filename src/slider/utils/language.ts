export function isZHLanguage() {
  return navigator.language.toLowerCase().startsWith('zh');
}

export enum LocaleMessageKey {
  PageErrorDesc = "PageErrorDesc",
  Refresh = "Refresh",
  PreviousSlide = "PreviousSlide",
  NextSlide = "NextSlide",
  SubmitSlide = "SubmitSlide"
}

const localeMessages = {
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
  }
}

export function getLocaleMessage(messageKey: LocaleMessageKey) {
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
  getLocaleMessage(messageKey: LocaleMessageKey | string): string;
}

export function createMessageBundle(messages: Record<string, any>): I18nMessageBundle {
  return {
    getLocaleMessage(messageKey: LocaleMessageKey | string): string {
      return messages[messageKey] ?? getLocaleMessage(messageKey as any);
    }
  }
}
