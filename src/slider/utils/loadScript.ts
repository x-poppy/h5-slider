import { useVariableScopes } from "../hooks/useVariableScopes";
import { SliderSchema } from "../types/Schema";
import { getRandomValueFromArray } from "./random";
import { request } from "./request";
import { match } from "./string";
import { getQueryObjectFromLocalStorage, getQueryObjectFromSearch, getURL } from "./url";

interface LoadScriptOpts {
  httpClient: Record<string, any>
  scriptContext: Record<string, any>
  throwError: (error: any) => void
  loadingIndication: Record<string, any>
  variableScopes: ReturnType<typeof useVariableScopes>
}

export async function loadScript(schema: SliderSchema, opts: LoadScriptOpts) {
  const scriptInfo = schema.script;
  if (!scriptInfo) {
    return;
  }

  // vendors
  const vendors = scriptInfo.vendors;
  if (vendors && vendors.length > 0) {
    let vendorUrls =  vendors.filter(vendor => {
      if (!vendor.url) {
        return false;
      }
      if (!vendor.userAgentMatcher) {
        return true;
      }
      return match(window.navigator.userAgent, vendor.userAgentMatcher, true);
    }).map((vendor) => {
      return getURL(vendor.url, schema.info?.baseURL);
    });

    vendorUrls = Array.from(new Set(vendorUrls));
    await Promise.all(vendorUrls.map(url => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      })
    }));
  }

  if (!scriptInfo.url) {
    return;
  }

  const queryStringQueryData = getQueryObjectFromSearch(scriptInfo.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(scriptInfo.localStorageMatcher);

  let url = getRandomValueFromArray(scriptInfo.url);
  url = getRandomValueFromArray(url);

  url = opts.variableScopes.getExpressValue(url, {
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
    }
  });


  url = getURL(url, schema.info?.baseURL);

  const response = await request(url, {
    headers: {
      'cache-control': 'no-cache'
    }
  });

  const responseText = await response.text();
  const scriptElement = document.createElement("script");
  const sliderAPI = {
    ...opts.scriptContext,
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
    },
    throwError: opts.throwError,
    httpClient: opts.httpClient,
    loadingIndication: opts.loadingIndication
  };

  (window as any).slider = sliderAPI;
  const scriptContent = `
  (function() {
    try {
      ${responseText}
    } catch(err) {
      window.slider.throwError(err);
    }
  })();
  `;
  scriptElement.setAttribute("slider-script", "");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement);
  // delete (window as any).slider;
}
