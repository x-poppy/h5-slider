import { useVariableScopes } from "../hooks/useVariableScopes";
import { SliderSchema } from "../types/Schema";
import { getRandomValueFromArray } from "./random";
import { request } from "./request";
import { match } from "./string";
import { getQueryObjectFromLocalStorage, getQueryObjectFromSearch, getURL } from "./url";

const ScriptParamsNames = Object.keys(window).filter(key=>{
  const win: Record<string, any> = window as any;
  if (win[key] === null) {
    return false;
  }
  if (typeof win[key] === 'number') {
    return false;
  }
  if (typeof win[key] === 'string') {
    return false;
  }

  return key !== 'window';
});
const ScriptParamsNamesStr = ScriptParamsNames.join(",");
const ScriptParamsNamesVal = ScriptParamsNames.map(() => undefined + '').join(",");

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
  const sliderScriptContext = {
    ...opts.scriptContext,
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
    },
    throwError: opts.throwError,
    httpClient: opts.httpClient,
    loadingIndication: opts.loadingIndication
  };

  (window as any).sliderScriptContext = sliderScriptContext;

  const globalVariables: string[] = [];
  if (scriptInfo.globalVariables) {
    if (typeof scriptInfo.globalVariables === 'string') {
      globalVariables.push(scriptInfo.globalVariables);
    } else if (Array.isArray(scriptInfo.globalVariables)) {
      globalVariables.push(...scriptInfo.globalVariables);
    }

    globalVariables.filter(globalVariable => {
      if (typeof globalVariable !== 'string') {
        return false;
      }
      return Object.prototype.hasOwnProperty.call(window, globalVariable);
    }).forEach(globalScope => {
      const globalVal = (window as any)[globalScope];
      if (typeof globalVal === 'function') {
        (sliderScriptContext as any)[globalScope] = globalVal.bind(window);
      } else {
        (sliderScriptContext as any)[globalScope] = globalVal;
      }
    })
  }

  const scriptContent = `
  (function(window, slider, ${ScriptParamsNamesStr}) {
    try {
      ${responseText}
    } catch(err) {
      slider.throwError(err);
    }
  }).apply(null, [{slider: window.sliderScriptContext}, window.sliderScriptContext, ${ScriptParamsNamesVal}]);
  `;
  scriptElement.setAttribute("slider-script", "");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement);
  delete (window as any).sliderScriptContext;
}
