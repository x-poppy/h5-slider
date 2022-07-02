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
import { initializeDocument } from "../../utils/initializeDocument";
import { validateScurity } from "../../utils/security";
import { useVariableScopes } from "../../hooks/useVariableScopes";

function SliderLoader() {
  const initialConfig = useInitialConfig();
  const scriptContext = useScriptContext();
  const httpClient = useHttpClient();
  const throwError = useThrowError();
  const variableScopes = useVariableScopes();

  const [sliderElement, setSliderElement] = useState<ReactElement | null>(null);
  const loadingIndication = useLoadingIndicator();

  useEffect(() => {
    callback(async () => {
      try {
        loadingIndication.start();

        let schemaUrl = initialConfig.schema;
        if (typeof initialConfig.schema !== 'string') {
          throwError(new Error("Invalid Schema"));
        }

        schemaUrl = decodeURIComponent(schemaUrl as unknown as string);
        // load schema
        const schema = await loadSchema(schemaUrl);

        const [storeData] = await Promise.all([
          loadStoreData(schema, {
            httpClient,
            initialConfig,
            variableScopes,
          }),
          loadScript(schema, {
            httpClient,
            scriptContext,
            variableScopes,
            throwError,
            loadingIndication,
          }),
          loadAllComponents(),
        ])

        // transform schema
        const schemaInitialEvt = scriptContext.emit(EventNames.OnSchemaInitial, {
          schema,
          selector: {
            find,
            findByType,
            findByProperty,
          }
        });
        const eventSchema = schemaInitialEvt.detail.payload?.schema;
        const transformedSchema = isComponentSchema(eventSchema) ? {
          ...eventSchema,
        } : schema;
        validateScurity(transformedSchema);

        // load script
        // this may modify in the scripts.
        const storeDataLoadedEvt  = scriptContext.emit(EventNames.OnStoreDataLoaded, storeData);
        const transformedStoreData = {
          ...(storeDataLoadedEvt.detail.payload ?? {})
        };

        let initialIndex = transformedStoreData[StoreKeyNames.ActiveIndex] ?? 0;
        if (process.env.NODE_ENV !== 'production' || transformedSchema.security?.allowDebugActiveIndex) {
          initialIndex = ~~(initialConfig.activeIndex ?? 0)
        }

        transformedStoreData[StoreKeyNames.StartTimeStamp] ??= Date.now();
        const element = createComponentFromSchema(transformedSchema, {
          localProps: {
            initialIndex,
            storeData: transformedStoreData
          }
        });
        initializeDocument(transformedSchema);
        setSliderElement(element as ReactElement);
        loadingIndication.end();
        scriptContext.emit(EventNames.OnLoaded, {
          schema: transformedSchema,
          storeData: transformedStoreData,
          initialIndex,
        });
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
