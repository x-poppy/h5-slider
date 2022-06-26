import { Method } from 'axios';
import { StoreKeyNames } from '../../hooks/useStore';
import { SliderEffectProps } from '../../types/Component';
import { getRandomValueFromArray } from '../../utils/random';
import { request } from '../../utils/request';
import { getStoreData } from '../../utils/storage';
import { getQueryObjectFromLocalStorage, getQueryObjectFromSearch, getURL } from '../../utils/url';

interface SubmitEffectProps extends SliderEffectProps {
  url: string | string[]
  method?: Method | string;
  query?: Record<string, any>;
  data?: Record<string, any>;
  // black list
  storeMatcher?: string | string[];
  // white list
  searchMatcher?: string | string[];
  // white list
  localStorageMatcher?: string | string[];

  // for testing purpose
  mock?: Record<string, any> | string;
}

async function SubmitEffect(props: SubmitEffectProps) {
  const context = props.context;
  const store = context.store;
  const httpClient = context.httpClient;
  const mock = !!context.initialConfig.mock;

  // whitelist mode
  const queryStringQueryData = getQueryObjectFromSearch(props.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(props.localStorageMatcher);
  // blacklist mode
  const storeData = getStoreData(store, props.storeMatcher);
  if (storeData && Object.keys(storeData).length > 0) {
    storeData[StoreKeyNames.EndTimeStamp] = Date.now();
  }
  
  if (mock && props.mock) {
    if (typeof props.mock === 'string') {
      const mockResponse =  await request(props.mock);
      const mockData = await mockResponse.json();
      props.event.detail = {
        ...props.event.detail,
        response: mockData,
      }
    } else {
      props.event.detail = {
        ...props.event.detail,
        response: props.mock,
      }
    }
    return;
  }

  let url = getRandomValueFromArray(props.url);
  url = context.variableScopes.getExpressValue(url, {
    ...props,
    query: {
      ...localStorageQueryData,
      ...queryStringQueryData,
      ...props.query
    }
  });

  url = getURL(url, props.$$schema.info?.baseURL);

  const response = await httpClient.request({
    url,
    method: props.method ?? 'post',
    // params: {
    //   ...props.query,
    //   ...queryStringQueryData,
    //   ...localStorageQueryData
    // },
    data: {
      ...storeData,
      ...props.data,
    }
  });

  props.event.detail = {
    ...props.event.detail,
    response: response.data,
  }
}

export default SubmitEffect;
