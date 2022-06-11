import { WidgetSchema } from "../types/Schema";
import { isWidgetSchema } from "./typeDetect";

type TravelSchemaTestFunction = (schema: WidgetSchema) => boolean;

function travelSchema(schema: WidgetSchema, callback: TravelSchemaTestFunction): WidgetSchema[] {
  const results = [];
  const children = schema.children; 
  const childrenFindResults = [];
  if (isWidgetSchema(children)) {
    const childFindResults = travelSchema(children as WidgetSchema, callback);
    childrenFindResults.push(...childFindResults);
  } else if (Array.isArray(children)) {
    children.forEach(item => {
      if (isWidgetSchema(children)) {
        const childFindResults = travelSchema(item as WidgetSchema, callback);
        childrenFindResults.push(...childFindResults);
      }
    })
  }
  results.push(...childrenFindResults);
  
  const props = schema.props;
  const propsFindResults = [];
  if (props) {
    for (const [, val] of Object.entries(props)) {
      if (isWidgetSchema(val)) {
        const propFindResults = travelSchema(val as WidgetSchema, callback);
        propsFindResults.push(...propFindResults);
      }
    }
  }
  results.push(...propsFindResults);

  if (isWidgetSchema(schema)) {
    if (callback(schema)) {
      results.push(schema);
    }
  }

  return results;
}


export function findByProperty(schema: WidgetSchema, propertyName: string, propertyVal: any) {
  const results = travelSchema(schema, () => {
    return schema.props?.[propertyName] === propertyVal;
  });

  return results;
}

export function findByType(schema: WidgetSchema, type: string) {
  const results = travelSchema(schema, () => {
    return schema.type === type;
  });

  return results;
}

export function find(schema: WidgetSchema, callback: TravelSchemaTestFunction) {
  const results = travelSchema(schema, callback);
  return results;
}



