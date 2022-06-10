import { filterObjectByKeys } from "./object";

function isRelativeURL(url: string) {
  if (url && url.startsWith('http')) {
    return false;
  }
  return true;
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
  "mock",
  "activeIndex",
  "debug"
];

export function getSearQueryObject(matcher?: string | string[]) {
  const searchParams = new URLSearchParams(window.location.search);

  const query = Object.fromEntries(searchParams);
  const filteredQuery: Record<string, any> = {};
  for (const [key, val] of Object.entries(query)) {
    if (!SearchParamKeyWorlds.includes(key)) {
      filteredQuery[key] = val;
    }
  }
  return filterObjectByKeys(filteredQuery, matcher ?? null);
}

export function getNavigationURL(href: string, matcher?: string | string[]) {
  return appendSearchParamsToUrl(href, getSearQueryObject(matcher));
}

