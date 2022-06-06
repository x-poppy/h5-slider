import React, { ReactNode, useContext, useMemo } from 'react';
import { SliderSchema } from '../types/SliderSchema';
import { createMessageBundle, I18nMessageBundle } from './language';
import { createPermissionManager, PermissionManager } from './permission';
import { createStoreManager, StoreManager } from './storeManager';
import { createVariableScopeManager, VariableScopeManager } from './variableScope';

const noop = () => {};

interface SliderNavigating {
  activeIndex: number;
  totalCount: number;
  preSlide: () => void;
  nextSlide: () => void;
  gotoSlide: (index: number) => void;
}

export interface SliderContext {
  navigation: SliderNavigating;
  i18nMessageBundle: I18nMessageBundle;
  permissionManager: PermissionManager;
  variableScopeManager: VariableScopeManager;
  storeManager: StoreManager;
}

const SliderReactContext = React.createContext<SliderContext>({
  navigation: {
    activeIndex: 0,
    totalCount: 0,
    preSlide: noop,
    nextSlide: noop,
    gotoSlide: noop,
  },
  i18nMessageBundle: createMessageBundle({}),
  permissionManager: createPermissionManager({}),
  variableScopeManager: createVariableScopeManager(),
  storeManager: createStoreManager({}),
});

export function useSliderContext() {
  return useContext(SliderReactContext);
}

const SliderReactContextProvider = SliderReactContext.Provider;

interface SliderContextProviderProps {
  sliderSchema: SliderSchema | null;
  activeIndex: number;
  totalCount: number;
  preSlide: () => void,
  nextSlide: () => void,
  gotoSlide: (index: number) => void,
  children?: ReactNode;
}

export function SliderContextProvider(props: SliderContextProviderProps) {
  const sliderSchema = props.sliderSchema;
  const definitions = sliderSchema?.definitions;
  const localeMessages = definitions?.LocaleMessages;
  const permissions = definitions?.Permissions;

  const navigation = useMemo(() => {
    return {
      activeIndex: props.activeIndex ?? 0,
      totalCount: props.totalCount ?? 0,
      preSlide: props.preSlide,
      nextSlide: props.nextSlide,
      gotoSlide: props.gotoSlide,
    };
  }, [props.activeIndex, props.gotoSlide, props.nextSlide, props.preSlide, props.totalCount])

  const i18nMessageBundle = useMemo(() => {
    return createMessageBundle(localeMessages ?? {})
  }, [localeMessages]);

  const permissionManager = useMemo(() => {
    return createPermissionManager(permissions ?? {});
  }, [permissions]);

  const variableScopeManager = useMemo(() => {
    return createVariableScopeManager({
      ...definitions,
      title: sliderSchema?.title ?? ""
    });
  }, [definitions, sliderSchema?.title]);

  const storeManager = useMemo(() => {
    return createStoreManager({});
  }, []);

  const apiInstance: SliderContext = useMemo(() => {
    return {
      navigation,
      i18nMessageBundle,
      permissionManager,
      variableScopeManager,
      storeManager,
    }
  }, [i18nMessageBundle, navigation, permissionManager, storeManager, variableScopeManager]);

  return (
    <SliderReactContextProvider value={apiInstance}>
      { props.children }
    </SliderReactContextProvider>
  );
}
