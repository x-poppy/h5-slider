import React, { ReactElement, ReactNode, useMemo, useRef } from 'react';

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
import SliderOverlapLayer from './SliderOverlapLayer';

export interface SliderProps extends SliderComponentProps {
  background?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
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

  const initStyle = useMemo(() => ({
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
    background: props.background,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <div className={styles.main} style={initStyle}>
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
                <SliderOverlapLayer>
                  { props.widgets }
                </SliderOverlapLayer>
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
