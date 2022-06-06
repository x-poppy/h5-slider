export function appendQuery(url: string, query: Record<string, string>) {
  if (!url) {
    return url;
  }
  const queryStr = Object.keys(query).map(queryKey => {
    const queryValue =  encodeURIComponent(query[queryKey]);
    return `${queryKey}=${queryValue}`;
  }).join("&");

  if (!queryStr) {
    return url;
  }
  return `${url}${url.includes("?") ? '&' : '?'}${queryStr}`;
}
