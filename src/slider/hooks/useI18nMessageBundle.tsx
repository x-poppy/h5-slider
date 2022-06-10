import React, { ReactNode, useContext, useMemo } from "react";
import { createI18nMessageBundle } from "../utils/language";
import { useSliderSchema } from "./userSliderSchema";

const I18nMessageBundleContext = React.createContext(createI18nMessageBundle({}));

interface I18nMessageBundleProviderProps {
  children?: ReactNode
}

export function I18nMessageBundleProvider(props: I18nMessageBundleProviderProps) {
  const sliderSchema = useSliderSchema();

  const definitions = sliderSchema?.definitions;
  const localeMessages = definitions?.LocaleMessages;

  const i18nMessageBundle = useMemo(() => {
    return createI18nMessageBundle(localeMessages ?? {})
  }, [localeMessages]);

  return (
    <I18nMessageBundleContext.Provider value={i18nMessageBundle}>
        { props.children }
    </I18nMessageBundleContext.Provider>
  );
}

export function useI18nMessageBundle() {
  return useContext(I18nMessageBundleContext)
}
