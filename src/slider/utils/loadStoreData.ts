import { AxiosInstance } from 'axios';
import {getProperty, hasProperty} from 'dot-prop';
import { useVariableScopes } from '../hooks/useVariableScopes';
import { SliderSchema } from '../types/Schema';
import { getRandomValueFromArray } from './random';
import { StoreValueType } from './storage';
import { getQueryObjectFromLocalStorage, getQueryObjectFromSearch, getURL } from './url';

export interface StoreResponseData {
  data?: Record<string, StoreValueType>
  index?: number;
}

interface LoadStoreDataOpts {
  httpClient: AxiosInstance, 
  variableScopes: ReturnType<typeof useVariableScopes>
  initialConfig: Record<string, any>
}

export async function loadStoreData(
    schema: SliderSchema, 
    opts: LoadStoreDataOpts) {
  const storeInfo = schema.store;
  if (!storeInfo) {
    return {};
  }

  const initialConfig = opts.initialConfig;

  if (initialConfig.mock && storeInfo.mock) {
    if (typeof storeInfo.mock === 'string') {
      const mockResponse = await fetch(storeInfo.mock);
      const mockData = await mockResponse.json();
      return {
        ...mockData
      }
    } else {
      return {
        ...storeInfo.mock
      };
    }
  }

  if (!storeInfo.url) {
    return {};
  }

  const queryStringQueryData = getQueryObjectFromSearch(storeInfo.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(storeInfo.localStorageMatcher);

  let url = getRandomValueFromArray(storeInfo.url);
  url = getRandomValueFromArray(url);
  url = opts.variableScopes.getExpressValue(url, {
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
    }
  });
  url = getURL(url, schema.info?.baseURL);

  const response = await opts.httpClient.get(url);

  if (!response.data) {
    return {};
  }

  const responseData = response.data;

  const responseDataPath = storeInfo?.responseDataPath;
  if (!responseDataPath) {
    return responseData;
  }

  if (hasProperty(responseData, responseDataPath)) {
    return getProperty(responseData, responseDataPath) ?? {};
  } else {
    return responseData;
  }
}
