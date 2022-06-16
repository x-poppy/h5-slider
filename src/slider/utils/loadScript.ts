import { SliderSchema } from "../types/Schema";
import { getURL } from "./url";

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

export async function loadScript(
    schema: SliderSchema, 
    scriptContext: Record<string, any>, 
    throwError: (error: any) => void) {
  let url = schema.script;

  if (!url) {
    return;
  }

  url = getURL(url, schema.info?.baseURL);

  const response = await window.fetch(url, {
    headers: {
      'cache-control': 'no-cache'
    }
  });
  const responseText = await response.text();
  const scriptElement = document.createElement("script");
  (window as any).sliderScriptContext = {
    ...scriptContext,
    throwError,
  };
  const scriptContent = `
  (function(window, slider, ${ScriptParamsNamesStr}) {
    ${responseText}
  }).apply(null, [{slider: window.sliderScriptContext}, window.sliderScriptContext, ${ScriptParamsNamesVal}]);
  `;
  scriptElement.setAttribute("slider-script", "");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement);
  delete (window as any).sliderScriptContext;
}
