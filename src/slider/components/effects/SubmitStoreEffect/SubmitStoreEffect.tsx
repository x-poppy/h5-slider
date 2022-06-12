import { Method } from 'axios';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { StoreKeyNames, useStore } from '../../../hooks/useStore';
import { SliderEffectProps } from '../../../types/Component';
import { getRandomValueFromArray } from '../../../utils/random';
import { getStoreData } from '../../../utils/storage';
import { getSearQueryObject, getURL } from '../../../utils/url';

interface HttpRequestEffectProps extends SliderEffectProps {
  url: string | string[]
  method?: Method | string;
  matcher?: string | string[];
  searchMatcher?: string | string[];
}

function SubmitStoreEffect(props: HttpRequestEffectProps) {
  const httpClient = useHttpClient();
  const store = useStore();
  useAsyncEffect(async () => {
    try {
      // whitelist mode
      const queryData = getSearQueryObject(props.searchMatcher);
      // blacklist mode
      const storeData = getStoreData(store, props.matcher);
      storeData[StoreKeyNames.EndTimeStamp] = storeData[StoreKeyNames.EndTimeStamp] ?? Date.now();
      const url = getURL(getRandomValueFromArray(props.url), props.$$schema.info?.baseURL);
      await httpClient.request({
        url,
        method: props.method ?? 'post',
        params: queryData,
        data: storeData
      })
      props.onEffectComplete();
    } catch (err) {
      props.onEffectComplete(err);
      throw err;
    }
  }, [props.event], {
    popupError: true,
    valid: !!props.event
  });
  
  return null;
}

export default SubmitStoreEffect;
