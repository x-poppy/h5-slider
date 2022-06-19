import { Method } from 'axios';
import { StoreKeyNames } from '../../hooks/useStore';
import { SliderEffectProps } from '../../types/Component';
import { getRandomValueFromArray } from '../../utils/random';
import { getStoreData } from '../../utils/storage';
import { getQueryObjectFromLocalStorage, getQueryObjectFromSearch, getURL } from '../../utils/url';

interface SubmitStoreEffectProps extends SliderEffectProps {
  url: string | string[]
  method?: Method | string;
  // black list
  matcher?: string | string[];
  // white list
  searchMatcher?: string | string[];
  // white list
  localStorageEffectMatcher?: string | string[];

  // for testing purpose
  mockData?: Record<string, any>;
}

async function SubmitStoreEffect(props: SubmitStoreEffectProps) {
  const context = props.context;
  const store = context.store;
  const httpClient = context.httpClient;

  // whitelist mode
  const queryData = getQueryObjectFromSearch(props.searchMatcher);
  const localStorageQueryData = getQueryObjectFromLocalStorage(props.localStorageEffectMatcher)
  // blacklist mode
  const storeData = getStoreData(store, props.matcher);
  storeData[StoreKeyNames.EndTimeStamp] = storeData[StoreKeyNames.EndTimeStamp] ?? Date.now();

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
      ...queryData,
      ...localStorageQueryData
    },
    data: storeData
  });
  props.event.detail = {
    ...props.event.detail,
    response: response.data,
  }
}

export default SubmitStoreEffect;
