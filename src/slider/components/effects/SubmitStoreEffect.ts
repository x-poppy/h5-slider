import { Method } from 'axios';
import { StoreKeyNames } from '../../hooks/useStore';
import { SliderEffectProps } from '../../types/Component';
import { getRandomValueFromArray } from '../../utils/random';
import { getStoreData } from '../../utils/storage';
import { getQueryObjectFromSearch, getURL } from '../../utils/url';

interface HttpRequestEffectProps extends SliderEffectProps {
  url: string | string[]
  method?: Method | string;
  matcher?: string | string[];
  searchMatcher?: string | string[];
}

async function SubmitStoreEffect(props: HttpRequestEffectProps) {
  const store = props.store;
  const httpClient = props.httpClient;

  // whitelist mode
  const queryData = getQueryObjectFromSearch(props.searchMatcher);
  // blacklist mode
  const storeData = getStoreData(store, props.matcher);
  storeData[StoreKeyNames.EndTimeStamp] = storeData[StoreKeyNames.EndTimeStamp] ?? Date.now();
  const url = getURL(getRandomValueFromArray(props.url), props.$$schema.info?.baseURL);
  await httpClient.request({
    url,
    method: props.method ?? 'post',
    params: queryData,
    data: storeData
  });
}

export default SubmitStoreEffect;
