import { Method } from 'axios';
import { StoreKeyNames } from '../../hooks/useStore';
import { SliderEffectProps } from '../../types/Component';
import { getRandomValueFromArray } from '../../utils/random';
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
  localStorageEffectMatcher?: string | string[];

  // for testing purpose
  mockData?: Record<string, any>;
}

async function SubmitEffect(props: SubmitEffectProps) {
  const context = props.context;
  const store = context.store;
  const httpClient = context.httpClient;

  // whitelist mode
  const queryStringQueryData = getQueryObjectFromSearch(props.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(props.localStorageEffectMatcher)
  // blacklist mode
  const storeData = getStoreData(store, props.storeMatcher);
  if (storeData && Object.keys(storeData).length > 0) {
    storeData[StoreKeyNames.EndTimeStamp] = Date.now();
  }
  
  if (props.mockData) {
    props.event.detail = {
      ...props.event.detail,
      response: props.mockData,
    }
    return;
  }

  const url = getURL(getRandomValueFromArray(props.url), props.$$schema.info?.baseURL);
  const response = await httpClient.request({
    url,
    method: props.method ?? 'post',
    params: {
      ...props.query,
      ...queryStringQueryData,
      ...localStorageQueryData
    },
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
