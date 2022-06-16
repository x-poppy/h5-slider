import { ReactElement, useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useInitialConfig } from "../../hooks/useInitialConfig";
import { EventNames, useScriptContext } from "../../hooks/useScriptContext";
import { StoreKeyNames } from "../../hooks/useStore";
import { loadSchema } from "../../utils/loadSchema";
import { loadScript } from "../../utils/loadScript";
import { loadStoreData } from "../../utils/loadStoreData";
import { find, findByProperty, findByType } from "../../utils/schema";
import { isComponentSchema } from "../../utils/typeDetect";
import { createComponentFromSchema } from "../../utils/componentFactory";
import { useLoadingIndicator } from "../LoadingIndicator";
import { useThrowError } from "../../hooks/useThrow";
import { callback } from "../../utils/callback";
import { loadAllComponents } from "../../components";
import { match } from "../../utils/string";

function SliderLoader() {
  const initialConfig = useInitialConfig();
  const scriptContext = useScriptContext();
  const httpClient = useHttpClient();
  const throwError = useThrowError();

  const [sliderElement, setSliderElement] = useState<ReactElement | null>(null);
  const loadingIndication = useLoadingIndicator();

  useEffect(() => {
    callback(async () => {
      // validation
      let schemaUrl = initialConfig.schema;
      if (typeof initialConfig.schema !== 'string') {
        throwError(new Error("Invalid Schema"));
      }
      schemaUrl = decodeURIComponent(schemaUrl as unknown as string);
      try {
        loadingIndication.start();
        // load schema
        const schema = await loadSchema(schemaUrl);
        // validate useragent
        const userAgentMatcher = schema.security?.userAgentMatcher;
        if (userAgentMatcher) {
          if (!match(window.navigator.userAgent, userAgentMatcher, true)) {
            throwError(new Error("Invalid UserAgent"));
          }
        }

        const [storeData] = await Promise.all([
          loadStoreData(httpClient, schema),
          loadScript(schema, scriptContext, throwError),
          loadAllComponents(),
        ])
        // load script
        const storeDataLoadedEvt = new CustomEvent(EventNames.OnStoreDataLoaded, {
          detail: storeData,
        });
        // this may modify in the scripts.
        scriptContext.emit(storeDataLoadedEvt);
        const transformedStoreData = {
          ...(storeDataLoadedEvt.detail ?? {})
        };
        const initialIndex = transformedStoreData[StoreKeyNames.ActiveIndex] ?? 
          (process.env.NODE_ENV === 'production' ? 0 : ~~(initialConfig.activeIndex ?? 0));
        transformedStoreData[StoreKeyNames.StartTimeStamp] ??= Date.now();

        // transform schema
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
        const transformedSchema = isComponentSchema(schemaInitialEvt.detail.schema) ? {
          ...schemaInitialEvt.detail.schema,
        } : schema;
        const element = createComponentFromSchema(transformedSchema, {
          localProps: {
            initialIndex: initialIndex,
            storeData: transformedStoreData
          }
        });

        setSliderElement(element as ReactElement);
        loadingIndication.end();

        scriptContext.emit(new CustomEvent(EventNames.OnLoaded));
      } catch(err) {
        setSliderElement(null);
        loadingIndication.end();
        throwError(err as Error);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return sliderElement;
}

export default SliderLoader;
