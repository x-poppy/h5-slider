import React, { ReactNode } from "react";
import { WidgetSchema } from "../types/Schema";
import { isWidgetSchema, isDebuggerValue, isPlainValue, isReactElement } from "./typeDetect";
import { getRandomString } from "./random";
import { getReferenceExpressValue, isReferenceExpress } from "./express";

type WidgetFactory = CallableFunction;

const widgetsMap: Map<string, WidgetFactory> = new Map();

export function registerWidget(widgetFactory: WidgetFactory, name?: string) {
  widgetsMap.set(name ?? widgetFactory.name , widgetFactory);
}

function createReactElement(name: string, props: any, children: any) {
  let ElementFactor = widgetsMap.get(name);
  if (!ElementFactor) {
    console.warn(`Can't find the '${name}' and back to the 'NoImplement Component'`);
    ElementFactor = widgetsMap.get('NoImplement') as any;
    props = {
      ...props,
      componentName: name
    }
  }

  return React.createElement(ElementFactor as any, props, children);
}

export function createWidgetFromSchema(
  schema: WidgetSchema,
  opts?: {
    refScopes?: Record<string, any>,
    localProps?: Record<string, any>,
    sharedProps?: Record<string, any>
  }, 
  parentSchema?: WidgetSchema
): ReactNode {
  // check the schema
  const isTopLevel = !parentSchema;
  if (schema === parentSchema) {
    throw new Error("Parent Schema Error!")
  }

  const sharedProps = {
    ...opts?.sharedProps,
  };

  const localProps:Record<string, any> = {
    ...opts?.localProps,
    key: getRandomString()
  };
  // isTopLevel
  if (isTopLevel) {
    sharedProps.$$schema = sharedProps.$$schema ?? schema;
  }

  const refScopes: Record<string, any> = {
    // self definitions is used my inner or fallback so it's has low priority
    ...schema.definitions,
    ...opts?.refScopes
  };

  // children
  let childrenValue = schema.children;
  // deconstruct the ref
  if (isReferenceExpress(childrenValue)) {
    childrenValue = getReferenceExpressValue(childrenValue, refScopes);
  }
  
  let childrenElement: any = null;
  if (isPlainValue(childrenValue)) {
    childrenElement = childrenValue;
  } else if (Array.isArray(childrenValue)) {
    // here the childrenValue may mix with react element and schema
    childrenElement = childrenValue.map((childrenItem) => {
      if (isPlainValue(childrenItem)) {
        return childrenItem;
      } else if (isReactElement(childrenItem)) {
        return childrenItem;
      } else if (isWidgetSchema(childrenItem)) {
        return createWidgetFromSchema(childrenItem, {
          sharedProps,
          refScopes,
        }, schema);
      }
      return null;
    });
  } else if (isReactElement(childrenValue)) {
    childrenElement = childrenValue;
  } else if (isWidgetSchema(childrenValue)) {
    childrenElement = createWidgetFromSchema(childrenValue as any, {
      refScopes,
      sharedProps,
    }, schema);
  }
  
  const schemaProps: Record<string, any> = {};
  if (schema.props) {
    for (const [key, val] of Object.entries(schema.props)) {
      // deconstruct the ref
      let propValue = val;
      if (isDebuggerValue(key)) {
        console.debug("slider widget factory debugger");
      } else if (isReferenceExpress(propValue)) {
        propValue = getReferenceExpressValue(val, refScopes);
      } else if (isWidgetSchema(propValue)) {
        propValue = createWidgetFromSchema(propValue, {
          refScopes: {
            ...refScopes,
            ...schemaProps,
          },
          sharedProps,
        }, schema);
      } else if (Array.isArray(propValue)) {
        propValue = propValue.map((item) => {
          if (isPlainValue(item)) {
            return item;
          } else if (isReactElement(item)) {
            return item;
          } else if (isWidgetSchema(item)) {
            return createWidgetFromSchema(item, {
              sharedProps,
              refScopes,
            }, schema);
          }
          return item;
        });
      }
      schemaProps[key] = propValue;
    }
  }

  // self
  const type = schema.type;
  if (isReferenceExpress(type)) {
    const refComponentSchema = getReferenceExpressValue(type, refScopes);
    if (!isWidgetSchema(refComponentSchema)) {
      throw Error(`Component(${type}) Reference Error`);
    }
    return createWidgetFromSchema(refComponentSchema, {
      refScopes: {
        ...refScopes,
        ...schemaProps,
        $children: childrenElement // RefType has a special props '$' for injection
      },
      sharedProps,
    }, schema);
  }

  return createReactElement(
    type, {
      name: getRandomString(),
      ...schemaProps,
      ...localProps,
      ...sharedProps,
      $schema: schema,
    },
    childrenElement
  )
}
