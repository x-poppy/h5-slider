import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import yaml from 'js-yaml';

import { getAppConfig } from './appConfig';

let axiosIns: AxiosInstance | null = null;

const mockAdapter = async (cfg: AxiosRequestConfig) => {
  const mockUrl = cfg.headers?.['x-mock-url'] as string;
  if (!mockUrl) {
    throw new Error('Mock url is empty!');
  }

  const results = await fetch(mockUrl as string);
  let data: any = null;
  if (mockUrl.endsWith('yml') ||  mockUrl.endsWith('ymal') ) {
    const responseText = await results.text();
    data = yaml.load(responseText);
  } else {
    data = await results.json();
  }
  return {
    data,
    status: results.status,
    statusText: results.statusText,
    headers: results.headers,
    config: cfg,
    request: {},
  };
};

export function initHttpClient(): void {
  if (axiosIns) return;
  const appConfig = getAppConfig();
  axiosIns = axios.create({
    baseURL: appConfig.apiPrefix,
    adapter: (appConfig.mock ? mockAdapter : undefined) as any,
    transformResponse: (data, headers) => {
      console.log(headers);
      if (headers?.['content-type'].includes('text/yaml')) {
        return yaml.load(data);
      }
    }
  });

}

export function getHttpClient(): AxiosInstance {
  return axiosIns as AxiosInstance;
}
