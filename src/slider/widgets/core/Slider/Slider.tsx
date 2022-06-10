import React, { ReactElement, useState } from 'react';

import { SliderWidgetProps } from '../../../types/Widget';
import { useSwiperState } from '../../../hooks/useSwiperState';
import { useEffectElement } from '../../../hooks/useEffectElement';
import { I18nMessageBundleProvider } from '../../../hooks/useI18nMessageBundle';
import { NavigationProvider } from '../../../hooks/useNavigation';
import { PermissionProvider } from '../../../hooks/usePermission';
import { StoreProvider } from '../../../hooks/useStore';
import { VariableScopesProvider } from '../../../hooks/useVariableScopes';

import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { useLoadingIndicator } from '../../../components/LoadingIndicator';
import { useScriptContext } from '../../../hooks/useScriptContext';
import { StoreValueType } from '../../../utils/storage';
import SliderOverlapLayer from './components/SliderOverlapLayer';
import { SliderSchemaProvider } from '../../../hooks/userSliderSchema';
import SliderContentLayer from './components/SliderContentLayer';

import styles from './Slider.module.css';
import { SliderEffectElement } from '../../../types/Element';

const EventNames = {
  Ready: 'ready'
}
export interface SliderProps extends SliderWidgetProps {
  background?: string;
  initialIndex?: number;
  storeData?: Record<string, StoreValueType>
  vertical?: boolean;
  cacheSize?: number;
  initialEffect?: SliderEffectElement;
  children?: ReactElement[];
}

// https://swiperjs.com/swiper-api
function Slider(props: SliderProps) {
  // initial props
  const slideElements = props.children ?? [];

  const loadingIndicator = useLoadingIndicator();
  const scriptContext = useScriptContext();
  const [isReady, setIsReady] = useState(!props.initialEffect);
  
  const [activeInitialEffect, openInitialEffect] = useEffectElement(props.initialEffect);
  const swiperState = useSwiperState(props.initialIndex ?? 0, slideElements.length, props.cacheSize);
  const hasSlides = swiperState.totalCount > 0;

  useAsyncEffect(async() => {
    if (!props.initialEffect) {
      scriptContext.emit(new Event(EventNames.Ready))
      return;
    }
    loadingIndicator.start();
    try {
      await openInitialEffect({
        eventName: EventNames.Ready
      });
      loadingIndicator.end();
      setIsReady(true);
      scriptContext.emit(new Event(EventNames.Ready))
    } catch(err) {
      loadingIndicator.end();
    }
  }, [], {
    isThrowErr: true
  });

  return (
    <div className={styles.main} style={{background: props.background}}>
      <SliderSchemaProvider sliderSchema={props.$$schema}>
        <I18nMessageBundleProvider>
          <NavigationProvider swiperState={swiperState}>
            <PermissionProvider>
              <StoreProvider data={props.storeData}>
                <VariableScopesProvider>
                  { (isReady  && hasSlides) &&
                    <SliderContentLayer
                      swiperRef={swiperState.swiperRef}
                      slideElements={slideElements}
                      vertical={props.vertical}
                      onActiveIndexChange={swiperState.onActiveIndexChange}
                    /> 
                  }
                  { hasSlides &&
                    <SliderOverlapLayer>
                      { activeInitialEffect }
                    </SliderOverlapLayer>
                  }
                </VariableScopesProvider>
              </StoreProvider>
            </PermissionProvider>
          </NavigationProvider>
        </I18nMessageBundleProvider>
      </SliderSchemaProvider>
    </div>
  );
}

export default Slider;
