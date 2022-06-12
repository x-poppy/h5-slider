import React, { ReactNode } from "react";
import { ComponentSchema } from "../types/Schema";
import { isComponentSchema, isDebuggerValue, isPlainValue, isReactElement } from "./typeDetect";
import { getRandomString } from "./random";
import { getReferenceExpressValue, isReferenceExpress } from "./express";
import { find } from "./schema";

type ComponentFactory = CallableFunction;

const registeredComponentsMap: Map<string, ComponentFactory> = new Map();

export function registerComponent(factory: ComponentFactory, name?: string) {
  registeredComponentsMap.set(name ?? factory.name , factory);
}

function createReactElement(name: string, props: any, children: any) {
  let ElementFactor = registeredComponentsMap.get(name);
  if (!ElementFactor) {
    console.warn(`Can't find the '${name}' and back to the 'NoImplement Component'`);
    ElementFactor = registeredComponentsMap.get('NoImplement') as any;
    props = {
      ...props,
      componentName: name
    }
  }

  return React.createElement(ElementFactor as any, props, children);
}

// export function findUsedComponentNamesFromSchema(schema: ComponentSchema): string[] {
//   const results = find(schema, (componentSchema: ComponentSchema) => {

//   });

//   return results;
// }

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
      } else if (isReactElement(childrenItem)) {
        return childrenItem;
      } else if (isComponentSchema(childrenItem)) {
        return createComponentFromSchema(childrenItem, {
          sharedProps,
          refScopes,
        }, schema);
      }
      return null;
    });
  } else if (isReactElement(childrenValue)) {
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
          } else if (isReactElement(item)) {
            return item;
          } else if (isComponentSchema(item)) {
            return createComponentFromSchema(item, {
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
