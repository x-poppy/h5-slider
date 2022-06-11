import React, { ReactElement, useState } from 'react';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useScriptContext } from '../../../hooks/useScriptContext';
import { SliderWidgetProps } from '../../../types/Widget';
import { loadSchema } from '../../../utils/loadSchema';
import { find, findByProperty, findByType } from "../../../utils/schema";
import { isWidgetSchema } from '../../../utils/typeDetect';
import { createWidgetFromSchema } from '../../../utils/widgetFactory';

const EventNames = {
  OnModuleSchemaInitial: "onSchemaInitial",
}

export interface ModuleProps extends SliderWidgetProps {
  url: string
}

function Module(props: ModuleProps) {
  const scriptContext = useScriptContext();
  const loadingIndicator = useLoadingIndicator();

  const [activeElement, setActiveElement] = useState<ReactElement | null>(null);
  
  useAsyncEffect(async () => {
    loadingIndicator.start();
    const schema = await loadSchema(props.url);
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
    const transformedSchema = isWidgetSchema(schemaInitialEvt.detail.schema) ? schemaInitialEvt.detail.schema : schema;
    // eslint-disable-next-line no-debugger
    debugger;
    const element = createWidgetFromSchema(transformedSchema, {
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
  }, [], {
    valid: !!props.url
  });

  return activeElement;
}

export default Module;
