import { SliderSchema } from "../types/Schema";

const ScriptParamsNames = Object.keys(window).filter(key=>key !== 'window');
const ScriptParamsNamesStr = ScriptParamsNames.join(",");
const ScriptParamsNamesVal = ScriptParamsNames.map(() => undefined + '').join(",");


export async function loadSliderScript(schema: SliderSchema, scriptContext?: Record<string, any>) {
  const url = schema.script;

  if (!url) {
    return;
  }

  const response = await window.fetch(url);
  const responseText = await response.text();
  const scriptElement = document.createElement("script");
  (window as any).sliderScriptContext = scriptContext ?? {};
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
