import { filterObjectByMatcher } from "./object";

export function isRelativeURL(url: string) {
  if (url && url.startsWith('http')) {
    return false;
  }
  return true;
}

export function getURL(url: string, baseURL?: string) {
  if (!isRelativeURL(url)) {
    return url;
  }

  if (!baseURL) {
    baseURL = window.location.origin + window.location.pathname;
  }

  return new URL(url, baseURL).href;
}

export function getURLWithQueryString(url: string, matcher?: string | string[] | null, search?:string | null) {
  url = getURL(url);
  return appendSearchParamsToUrl(url, getQueryObjectFromSearch(matcher, search));
}


export function getBaseURL(url: string) {
  let targetURL = url;
  if (isRelativeURL(url)) {
    targetURL = getURL(url);
  }
  const urlObj = new URL(targetURL);
  return urlObj.origin + urlObj.pathname;
}

function appendSearchParamsToUrl(url: string, query?: Record<string, any>) {
  if (!url) {
    return url;
  }

  if (!query || Object.keys(query).length < 1) {
    return url;
  }

  const urlObj = new URL(url, isRelativeURL(url) ? (window.location.origin + window.location.pathname) : undefined);
  for (const [key, val] of Object.entries(query)) {
    urlObj.searchParams.append(key, encodeURIComponent(val));
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

export function isURLsCors(targetURL: string, currentURL?: string) {
  if (isRelativeURL(targetURL)) {
    return false;
  }

  const targetUrl = new URL(targetURL);
  const currentUrl = currentURL ? new URL(currentURL): window.location;
  return targetUrl.origin !== currentUrl.origin;
}

