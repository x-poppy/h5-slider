import yaml from 'js-yaml';
import { SliderSchema } from '../types/Schema';

export async function loadSchema(url: string) {
  if (!url) {
    throw new Error("Invalid Url");
  }

  const response = await window.fetch(url);
  const responseText = await response.text();
  const contextType = response.headers.get('content-type');

  let data = null;
  if (contextType && contextType.includes("text/yaml")) {
    data = yaml.load(responseText);
  } else {
    data = JSON.stringify(responseText);
  }

  return data as SliderSchema;
}
