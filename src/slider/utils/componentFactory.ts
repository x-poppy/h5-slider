import React, { ReactNode } from "react";
import { ComponentSchema } from "../types/Schema";
import { isComponentSchema, isDebuggerValue, isPlainObject, isPlainValue, isReactOrEffectElement } from "./typeDetect";
import { getRandomString } from "./random";
import { getReferenceExpressValue, isReferenceExpress } from "./express";

export type ComponentFactory = CallableFunction;
interface ComponentMetadata {
  name: string;
  factory: ComponentFactory;
  isReactComponent: boolean,
}

const registeredComponentsMap: Map<string, ComponentMetadata> = new Map();

export function registerComponent(factory: ComponentFactory, name: string, isReactComponent?: boolean) {
  registeredComponentsMap.set(name, {
    factory,
    name,
    isReactComponent: isReactComponent ?? true,
  });
}

function createComponentElement(name: string, props: any, children: any) {
  let ElementFactor: ComponentFactory | null = null;
  const metadata = registeredComponentsMap.get(name);
  if (!metadata) {
    console.warn(`Can't find the '${name}' and back to the 'NoImplement Component'`);
    ElementFactor = registeredComponentsMap.get('NoImplement')!.factory;
    return React.createElement(ElementFactor as any, props, children);
  } else {
    ElementFactor = registeredComponentsMap.get(name)!.factory;
  }
  if (metadata.isReactComponent) {
    return React.createElement(ElementFactor as any, props, children);
  } else {
    return {
      $$effect: ElementFactor,
      ...props,
      componentName: name,
      children,
    }
  }
}

export function createComponentFromSchema(
  schema: ComponentSchema,
  opts?: {
    refScopes?: Record<string, any>,
    localProps?: Record<string, any>,
    sharedProps?: Record<string, any>
  }, 
  parentSchema?: ComponentSchema
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
      } else if (isReactOrEffectElement(childrenItem)) {
        return childrenItem;
      } else if (isComponentSchema(childrenItem)) {
        return createComponentFromSchema(childrenItem, {
          sharedProps,
          refScopes,
        }, schema);
      }
      return null;
    });
  } else if (isReactOrEffectElement(childrenValue)) {
    childrenElement = childrenValue;
  } else if (isComponentSchema(childrenValue)) {
    childrenElement = createComponentFromSchema(childrenValue as any, {
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
        console.debug("slider component factory debugger");
      } else if (isReferenceExpress(propValue)) {
        propValue = getReferenceExpressValue(val, refScopes);
      } else if (isComponentSchema(propValue)) {
        propValue = createComponentFromSchema(propValue, {
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
          } else if (isReactOrEffectElement(item)) {
            return item;
          } else if (isComponentSchema(item)) {
            return createComponentFromSchema(item, {
              sharedProps,
              refScopes,
            }, schema);
          }
          return item;
        });
      } else if (isPlainObject(propValue)) {
        // todo we need put it in the self loop
        const results: Record<string, any> = {};
        for (const [key, val] of Object.entries(propValue)) {
          if (isReferenceExpress(val)) {
            results[key] = getReferenceExpressValue(val, refScopes);
          } else {
            results[key] = val;
          }
        }
        propValue = results;
      }
      schemaProps[key] = propValue;
    }
  }

  // self
  const type = schema.type;
  if (isReferenceExpress(type)) {
    const refComponentSchema = getReferenceExpressValue(type, refScopes);
    if (!isComponentSchema(refComponentSchema)) {
      throw Error(`Component(${type}) Reference Error`);
    }
    return createComponentFromSchema(refComponentSchema, {
      refScopes: {
        ...refScopes,
        ...schemaProps,
        $children: childrenElement // RefType has a special props '$' for injection
      },
      sharedProps,
    }, schema);
  }

  return createComponentElement(
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
