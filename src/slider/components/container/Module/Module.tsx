import React, { ReactElement, useState } from 'react';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useScriptContext } from '../../../hooks/useScriptContext';
import { SliderComponentProps } from '../../../types/Component';
import { loadSchema } from '../../../utils/loadSchema';
import { find, findByProperty, findByType } from "../../../utils/schema";
import { isComponentSchema } from '../../../utils/typeDetect';
import { createComponentFromSchema } from '../../../utils/componentFactory';

const EventNames = {
  OnModuleSchemaInitial: "onSchemaInitial",
}

export interface ModuleProps extends SliderComponentProps {
  url: string
}

function Module(props: ModuleProps) {
  const scriptContext = useScriptContext();
  const loadingIndicator = useLoadingIndicator();

  const [activeElement, setActiveElement] = useState<ReactElement | null>(null);
  
  useAsyncEffect(async () => {
    try {
      loadingIndicator.start();
      const schema = await loadSchema(props.url, props.$$schema.info?.baseURL);
      const schemaInitialEvt = new CustomEvent(EventNames.OnModuleSchemaInitial, {
        detail: {
          schema,
          name: props.name,
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
        refScopes: {
          ...props.$$schema.definitions,
          ...props.$schema.definitions,
        }, 
        sharedProps: {
          $$schema: props.$$schema,
        }
      });
      setActiveElement(element as ReactElement);
      loadingIndicator.end();
    } catch (err) {
      loadingIndicator.end();
    }
  }, [], {
    valid: !!props.url
  });

  return activeElement;
}

export default Module;
