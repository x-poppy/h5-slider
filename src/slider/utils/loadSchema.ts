import yaml from 'js-yaml';
import { SliderSchema } from '../types/Schema';
import { getBaseURL, getURL } from './url';

export async function loadSchema(url: string, baseURL?: string) {
  if (!url) {
    throw new Error("Invalid Url");
  }

  url = getURL(url, baseURL);

  const response = await window.fetch(url, {
    headers: {
      'cache-control': 'no-cache'
    }
  });
  const responseText = await response.text();
  const contextType = response.headers.get('content-type');

  let data = null;
  if (contextType && contextType.includes("text/yaml")) {
    data = yaml.load(responseText);
  } else {
    data = JSON.stringify(responseText);
  }

  const schema = data as SliderSchema;
  const hasBaseURL = !!(schema?.info?.baseURL);
  if (!hasBaseURL) {
    if (!schema.info) {
      schema.info = {};
    }
    schema.info.baseURL = getBaseURL(url);
    schema.info.encodedBaseURL = encodeURIComponent(schema.info.baseURL);
  }

  return schema;
}
