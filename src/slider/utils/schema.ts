import { ComponentSchema } from "../types/Schema";
import { isComponentSchema } from "./typeDetect";

type TravelSchemaTestFunction = (schema: ComponentSchema) => boolean;

function travelSchema(schema: ComponentSchema, callback: TravelSchemaTestFunction): ComponentSchema[] {
  const results = [];
  const children = schema.children; 
  const childrenFindResults = [];
  if (isComponentSchema(children)) {
    const childFindResults = travelSchema(children as ComponentSchema, callback);
    childrenFindResults.push(...childFindResults);
  } else if (Array.isArray(children)) {
    children.forEach(item => {
      if (isComponentSchema(children)) {
        const childFindResults = travelSchema(item as ComponentSchema, callback);
        childrenFindResults.push(...childFindResults);
      }
    })
  }
  results.push(...childrenFindResults);
  
  const props = schema.props;
  const propsFindResults = [];
  if (props) {
    for (const [, val] of Object.entries(props)) {
      if (isComponentSchema(val)) {
        const propFindResults = travelSchema(val as ComponentSchema, callback);
        propsFindResults.push(...propFindResults);
      }
    }
  }
  results.push(...propsFindResults);

  if (isComponentSchema(schema)) {
    if (callback(schema)) {
      results.push(schema);
    }
  }

  return results;
}


export function findByProperty(schema: ComponentSchema, propertyName: string, propertyVal: any) {
  const results = travelSchema(schema, () => {
    return schema.props?.[propertyName] === propertyVal;
  });

  return results;
}

export function findByType(schema: ComponentSchema, type: string) {
  const results = travelSchema(schema, () => {
    return schema.type === type;
  });

  return results;
}

export function find(schema: ComponentSchema, callback: TravelSchemaTestFunction) {
  const results = travelSchema(schema, callback);
  return results;
}



