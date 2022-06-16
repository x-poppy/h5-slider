import React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { useScriptContext } from '../../../hooks/useScriptContext';
import { SliderComponentProps } from '../../../types/Component';
import { loadSchema } from '../../../utils/loadSchema';
import { find, findByProperty, findByType } from "../../../utils/schema";
import { isComponentSchema } from '../../../utils/typeDetect';
import { createComponentFromSchema } from '../../../utils/componentFactory';
import { callback } from '../../../utils/callback';
import { SchemaDefinition } from '../../../types/Schema';

const EventNames = {
  OnModuleSchemaInitial: "onSchemaInitial",
}

export interface ModuleProps extends SliderComponentProps {
  url: string
  definitions?: SchemaDefinition
}

function Module(props: ModuleProps) {
  const scriptContext = useScriptContext();
  const loadingIndicator = useLoadingIndicator();

  const [activeElement, setActiveElement] = useState<ReactElement | null>(null);
  
  useEffect(() => {
    if (!props.url) {
      return;
    }
    callback(async () => {
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
            ...props
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
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return activeElement;
}

export default Module;
