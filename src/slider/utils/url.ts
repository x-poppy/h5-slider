import { filterObjectByMatcher } from "./object";

export function isRelativeURL(url: string) {
  if (url && (url.startsWith('http') || url.startsWith('//'))) {
    return false;
  }
  return true;
}


// baseURL = http://www.xxx.com/aaa/bbb
// url = ./
// http://www.xxx.com/aaa/bbb
export function getURL(url: string, baseURL?: string) {
  if (!isRelativeURL(url)) {
    return url;
  }

  if (!baseURL) {
    baseURL = window.location.origin + window.location.pathname;
    if (!baseURL.endsWith('/')) {
      baseURL = baseURL + '/';
    }
  }

  return new URL(url, baseURL).href;
}

export function getURLWithQueryString(url: string, matcher?: string | string[] | null, search?:string | null) {
  url = getURL(url);
  return appendQueryToUrl(url, getQueryObjectFromSearch(matcher, search));
}

export function getBaseURL(url: string) {
  let targetURL = url;
  if (isRelativeURL(url)) {
    targetURL = getURL(url);
  }
  if (targetURL.endsWith('/')) {
    return targetURL;
  } if (targetURL.lastIndexOf('.') > targetURL.lastIndexOf('/')) {
    return new URL('./', targetURL).href;
  } else {
    return new URL('./', targetURL).href + '/';
  }
}

export function appendQueryToUrl(url: string, query: Record<string, any> = {}) {
  if (!url) {
    return url;
  }

  const urlObj = new URL(url, isRelativeURL(url) ? (window.location.origin + window.location.pathname) : undefined);
  const searchParams = urlObj.searchParams;
  for (const [key, val] of Object.entries(query)) {
    searchParams.append(key, encodeURIComponent(val));
  }
  return urlObj.toString();
}

const SearchParamKeyWorlds = [
  "schema",
  "language",
  "mock",
  "activeIndex",
  "debug"
];

export function getQueryObjectFromSearch(matcher?: string | string[] | null, search?:string | null) {
  const searchParams = new URLSearchParams(search ?? window.location.search);
  const query = Object.fromEntries(searchParams);
  const filteredQuery: Record<string, any> = {};
  for (const [key, val] of Object.entries(query)) {
    if (!SearchParamKeyWorlds.includes(key)) {
      filteredQuery[key] = encodeURIComponent(val);
    }
  }
  return filterObjectByMatcher(filteredQuery, matcher ?? null, true);
}

export function getQueryObjectFromLocalStorage(matcher?: string | string[] | null) {
  const localStorage = window.localStorage;
  const keys = Object.keys(window.localStorage);

  const filteredQuery = keys.reduce< Record<string, any>>((map, key) => {
    const val = localStorage.getItem(key);
    if (val) {
      map[key] = val;
    }
    return map;
  }, {});

  return filterObjectByMatcher(filteredQuery, matcher ?? null, true);
}

export function isURLsCors(targetURL: string, currentURL?: string) {
  if (isRelativeURL(targetURL)) {
    return false;
  }

  const targetUrl = new URL(targetURL);
  const currentUrl = currentURL ? new URL(currentURL): window.location;
  return targetUrl.origin !== currentUrl.origin;
}

