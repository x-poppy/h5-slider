import React, { ReactElement, ReactNode, useRef } from 'react';

import { SliderComponentProps } from '../../../types/Component';
import { I18nMessageBundleProvider } from '../../../hooks/useI18nMessageBundle';
import { NavigationProvider } from '../../../hooks/useNavigation';
import { PermissionProvider } from '../../../hooks/usePermission';
import { StoreProvider } from '../../../hooks/useStore';
import { VariableScopesProvider } from '../../../hooks/useVariableScopes';

import { StoreValueType } from '../../../utils/storage';
import { SliderSchemaProvider } from '../../../hooks/userSliderSchema';
import SliderContentLayer from './SliderContentLayer';

import styles from './Slider.module.css';
import { SwiperInstance } from 'react-vant';
import OverlapLayer from '../../../baseComponents/OverlapLayer';
import { OverlapLayerRefProvider } from '../../../hooks/useOverlapLayerRef';
export interface SliderProps extends SliderComponentProps {
  background?: string;
  initialIndex: number;
  storeData?: Record<string, StoreValueType>
  vertical?: boolean;
  cacheSize?: number;
  widgets?: ReactNode;
  children?: ReactElement[];
}

// https://swiperjs.com/swiper-api
function Slider(props: SliderProps) {
  // initial props
  const slideElements = Array.isArray(props.children) ? props.children : [];
  const totalCount = slideElements.length;
  const swiperRef = useRef<SwiperInstance>(null);
  return (
    <div className={styles.main} style={{background: props.background}}>
      <SliderSchemaProvider sliderSchema={props.$$schema}>
        <I18nMessageBundleProvider>
          <NavigationProvider 
            swiperRef={swiperRef} 
            initialIndex={props.initialIndex} 
            cacheSize={props.cacheSize}
            totalCount={totalCount}>
            <PermissionProvider>
              <StoreProvider data={props.storeData}>
                <VariableScopesProvider>
                  { totalCount > 0 &&
                    <SliderContentLayer
                      swiperRef={swiperRef}
                      slideElements={slideElements}
                      vertical={props.vertical}
                    />
                  }
                  <OverlapLayerRefProvider>
                    <OverlapLayer>
                      { props.widgets }
                    </OverlapLayer>
                  </OverlapLayerRefProvider>
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
