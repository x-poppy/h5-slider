interface WidgetSchema<T1 extends string = string, T2 extends string = string> {
  type: T1,
  props?: Record<string, any>,
  definitions?: SchemaDefinition
  children: WidgetSchema<T2> | SliderMetadata<T2>[] | string | number | null | undefined
}

export interface SchemaDefinition {
  LocaleMessages?: Record<string, string | number | null | undefined>
  Permissions?: Record<string>
  [key: string]: SchemaDefinition | WidgetSchema | null | string | number | undefined
}

export interface SchemaInfo {
  title?: string;
  lang?: string;
  favicon?: string;
  description?: string;
  themeColor?: string;
  viewport?: string;
  // only for apple
  // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
  statusBarStyle?: string;
  appleTouchIcon?: string;
  background?: string;
  contentBackground?: string;
}

export interface SchemaStore {
  url: string | string[];
  searchMatcher?: string;
  responseDataPath?: string;
}

export interface SliderSchema extends WidgetSchema<'Slider', 'Slide'> {
  version: string;
  info?: SchemaInfo;
  script?: string;
  store?: SchemaStore;
}

