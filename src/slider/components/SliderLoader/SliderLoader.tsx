import { ReactElement, useState } from "react";
import { useAsyncEffect } from "../../hooks/useAsyncEffect";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useInitialConfig } from "../../hooks/useInitialConfig";
import { useScriptContext } from "../../hooks/useScriptContext";
import { loadSliderSchema } from "../../utils/loadSliderSchema";
import { loadSliderScript } from "../../utils/loadSliderScript";
import { loadStoreData } from "../../utils/loadStoreData";
import { find, findByProperty, findByType } from "../../utils/schemaFinder";
import { isWidgetSchema } from "../../utils/typeDetect";
import { createWidgetFromSchema } from "../../utils/widgetFactory";
import { useLoadingIndicator } from "../LoadingIndicator";

const EventNames = {
  OnStoreDataLoaded: "onStoreDataLoaded",
  OnSchemaInitial: "onSchemaInitial",
}

function SliderLoader() {
  const initialConfig = useInitialConfig();
  const scriptContext = useScriptContext();
  const httpClient = useHttpClient();

  const [sliderElement, setSliderElement] = useState<ReactElement | null>(null);
  const loadingIndication = useLoadingIndicator();

  useAsyncEffect(async () => {
    // validation
    if (!initialConfig.schema || typeof initialConfig.schema !== 'string') {
      throw new Error("Invalid Schema");
    }
    try {
      loadingIndication.start();
      // load schema
      const schemaUrl = decodeURIComponent(initialConfig.schema);
      const schema = await loadSliderSchema(schemaUrl);
      const storeData = await loadStoreData(httpClient, schema);

      // load script
      await loadSliderScript(schema, scriptContext);
      const storeDataLoadedEvt = new CustomEvent(EventNames.OnStoreDataLoaded, {
        detail: storeData,
      });
      // this may modify in the scripts.
      scriptContext.emit(storeDataLoadedEvt);
      const transformedStoreData = storeDataLoadedEvt.detail ?? {};
      const initialIndex = transformedStoreData.activeIndex ?? ~~(initialConfig.activeIndex ?? 0);

      const schemaInitialEvt = new CustomEvent(EventNames.OnSchemaInitial, {
        detail: {
          schema,
          selector: {
            find,
            findByType,
            findByProperty,
          }
        }
      });
      scriptContext.emit(storeDataLoadedEvt);
      const transformedSchema = isWidgetSchema(schemaInitialEvt.detail.schema) ? schemaInitialEvt.detail.schema : schema;
      const element = createWidgetFromSchema(transformedSchema, {
        localProps: {
          initialIndex: initialIndex,
          storeData: transformedStoreData
        }
      });
      setSliderElement(element as ReactElement);
      loadingIndication.end();
    } catch(err) {
      setSliderElement(null);
      loadingIndication.end();
      throw err;
    }
  // eslint-disable-next-line 
  }, [], {
    popupError: false
  });
  
  return sliderElement;
}

export default SliderLoader;
