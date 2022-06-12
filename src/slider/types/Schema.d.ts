interface ComponentSchema {
  type: string,
  definitions?: SchemaDefinition
  props?: Record<string, any>,
  children?: ComponentSchema | ComponentSchema[] | string | number | null | undefined
}

export interface SchemaDefinition {
  LocaleMessages?: Record<string, string | number | null | undefined>
  Permissions?: Record<string>
  [key: string]: SchemaDefinition | ComponentSchema | null | string | number | undefined
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
  baseURL?: string;
}

export interface SchemaStore {
  url: string | string[];
  searchMatcher?: string;
  responseDataPath?: string;
}

export interface SchemaSecurity{
  knownHosts?: string[]
}

export interface SlideSchema extends ComponentSchema {
  title?: string;
}

export interface SliderSchema extends ComponentSchema {
  version: string;
  info?: SchemaInfo;
  script?: string;
  store?: SchemaStore;
  security?: SchemaSecurity;
  children: SlideSchema[]
}

