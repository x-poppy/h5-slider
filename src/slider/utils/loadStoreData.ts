import { AxiosInstance } from 'axios';
import {getProperty, hasProperty} from 'dot-prop';
import { SliderSchema } from '../types/Schema';
import { getRandomValueFromArray } from './random';
import { StoreValueType } from './storage';
import { getSearQueryObject } from './url';

export interface StoreResponseData {
  data?: Record<string, StoreValueType>
  index?: number;
}

export async function loadStoreData(httpClient: AxiosInstance, schema: SliderSchema) {
  const storeInfo = schema.store;
  if (!storeInfo) {
    return {};
  }

  let url = storeInfo.url;
  if (!url) {
    return {};
  }

  url = getRandomValueFromArray(url);
  const response = await httpClient.get(url, {
    params: getSearQueryObject(storeInfo?.searchMatcher),
  })

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