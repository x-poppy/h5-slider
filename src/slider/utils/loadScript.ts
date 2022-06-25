import { useVariableScopes } from "../hooks/useVariableScopes";
import { SliderSchema } from "../types/Schema";
import { getRandomValueFromArray } from "./random";
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
  scriptContext: Record<string, any>
  throwError: (error: any) => void
  variableScopes: ReturnType<typeof useVariableScopes>
}

export async function loadScript(schema: SliderSchema, opts: LoadScriptOpts) {
  const scriptInfo = schema.script;
  if (!scriptInfo) {
    return;
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

  const response = await window.fetch(url, {
    headers: {
      'cache-control': 'no-cache'
    }
  });
  const responseText = await response.text();
  const scriptElement = document.createElement("script");
  (window as any).sliderScriptContext = {
    ...opts.scriptContext,
    throwError: opts.throwError,
  };
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
