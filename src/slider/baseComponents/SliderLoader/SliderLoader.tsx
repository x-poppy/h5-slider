import { ReactElement, useState } from "react";
import { useAsyncEffect } from "../../hooks/useAsyncEffect";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useInitialConfig } from "../../hooks/useInitialConfig";
import { useScriptContext } from "../../hooks/useScriptContext";
import { StoreKeyNames } from "../../hooks/useStore";
import { loadSchema } from "../../utils/loadSchema";
import { loadSliderScript } from "../../utils/loadSliderScript";
import { loadStoreData } from "../../utils/loadStoreData";
import { find, findByProperty, findByType } from "../../utils/schema";
import { isComponentSchema } from "../../utils/typeDetect";
import { createComponentFromSchema } from "../../utils/componentFactory";
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
      const schema = await loadSchema(schemaUrl);
      const storeData = await loadStoreData(httpClient, schema);

      // load script
      await loadSliderScript(schema, scriptContext);
      const storeDataLoadedEvt = new CustomEvent(EventNames.OnStoreDataLoaded, {
        detail: storeData,
      });
      // this may modify in the scripts.
      scriptContext.emit(storeDataLoadedEvt);
      const transformedStoreData = storeDataLoadedEvt.detail ?? {};
      const initialIndex = transformedStoreData[StoreKeyNames.ActiveIndex] ?? 
        (process.env.NODE_ENV === 'production' ? 0 : ~~(initialConfig.activeIndex ?? 0));
      transformedStoreData[StoreKeyNames.StartTimeStamp] = transformedStoreData[StoreKeyNames.StartTimeStamp] ?? Date.now();

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
      scriptContext.emit(schemaInitialEvt);
      const transformedSchema = isComponentSchema(schemaInitialEvt.detail.schema) ? schemaInitialEvt.detail.schema : schema;
      const element = createComponentFromSchema(transformedSchema, {
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
