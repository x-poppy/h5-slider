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

export interface SchemaCSSVariables {
  [variableName: string]: string;
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
  encodedBaseURL?: string;
}

export interface SchemaStore {
  url: string | string[];
  mock?: Record<string, any> | string;
  searchMatcher?: string | string[];
  localStorageMatcher?: string | string[];
  responseDataPath?: string;
}

export interface SchemaVendorScript {
  url: string;
  userAgentMatcher?: string | string[];
}

export interface SchemaScript {
  url: string | string[];
  globalVariables?: string | string[];
  searchMatcher?: string | string[];
  localStorageMatcher?: string | string[];
  vendors?: SchemaVendorScript[]
}

export interface SchemaSecurity{
  knownHosts?: string[]
  userAgentMatcher?: string | string[];
  searchMatcher?: string | string[];
  allowDebugActiveIndex?: boolean
  skipValidation?: boolean
}

export interface SlideSchema extends ComponentSchema {
  title?: string;
}

export interface SliderSchema extends ComponentSchema {
  version: string;
  info?: SchemaInfo;
  script?: SchemaScript;
  cssVariables?: SchemaCSSVariables;
  store?: SchemaStore;
  security?: SchemaSecurity;
  children: SlideSchema[]
}

