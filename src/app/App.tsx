import React, { ReactNode, useCallback, useState } from 'react';
import styles from './App.module.css';
import { initHttpClient } from './appHttpClient';
import { useInit } from '../slider/hooks/useInit';
import { sliderAPI } from '../apis/sliderAPI';
import { getAppConfig } from './appConfig';
import { SliderSchema } from '../slider/types/SliderSchema';
import { createWidgetFromSchema } from '../slider';
import { useAsyncEffect } from '../slider/hooks/useAsyncEffect';

function appInitializer() {
  initHttpClient();
}

async function createSliderElementFromAPI() {
  const appConfig = getAppConfig();

  // init props for slider.
  const sliderId = appConfig.sliderId as string;
  const sliderPath = appConfig.sliderPath as string;
  const slideIndex = ~~(appConfig.slideIndex as string);

  // api request
  const response = (await sliderAPI.loadSlider(sliderId, sliderPath));
  const sliderSchema = response.data as SliderSchema;
  // the slider element
  const element = createWidgetFromSchema(sliderSchema, {
    localProps: {
      slideIndex,
    }
  });

  return element;
}

// https://react-vant.3lang.dev/
function App() {
  useInit(appInitializer);
  const [sliderElement, setSliderElement] = useState<ReactNode | null>(null);
  const onInitRequest = useCallback(async () => {
    const element = await createSliderElementFromAPI();
    setSliderElement(element);
  }, []);
  useAsyncEffect(onInitRequest);
  
  return (
    <div className={styles.main}>
      { sliderElement }
    </div>
  );
}

export default App;
