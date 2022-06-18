import { SchemaCSSVariables, SchemaInfo, SliderSchema } from "../types/Schema";
import { getURL } from "./url";

function initContextmenu() {
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}

function initDocumentTitle(info: SchemaInfo) {
  if (info.title) {
    document.title = info.title;
  }
}

function initDocumentLanguage(info: SchemaInfo) {
  if (info.lang) {
    document.documentElement.setAttribute("lang", info.lang);
  }
}

function initDocumentFaviconIcon(info: SchemaInfo) {
  const iconElement = document.head.querySelector("link[rel='icon']");
  if (iconElement) {
    const faviconURL = (info.favicon && getURL(info.favicon, info.baseURL)) ?? "./favicon.ico";
    iconElement.setAttribute("href", faviconURL);
  }
}

function initDocumentDescription(info: SchemaInfo) {
  if (info.description) {
    const descElement = document.head.querySelector("meta[name='description']");
    if (descElement) {
      descElement.setAttribute("content", info.description);
    }
  }
}

function initDocumentThemeColor(info: SchemaInfo) {
  if (info.themeColor) {
    const descElement = document.head.querySelector("meta[name='theme-colo']");
    if (descElement) {
      descElement.setAttribute("content", info.themeColor);
    }
  }
}

function initViewport(info: SchemaInfo) {
  if (info.viewport) {
    const descElement = document.head.querySelector("meta[name='viewport']");
    if (descElement) {
      descElement.setAttribute("content", info.viewport);
    }
  }
}

function initStatusBarStyle(info: SchemaInfo) {
  if (info.statusBarStyle) {
    const descElement = document.head.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");
    if (descElement) {
      descElement.setAttribute("content", info.statusBarStyle);
    }
  }
}

function initAppTouchIcon(info: SchemaInfo) {
  if (info.appleTouchIcon) {
    const appleTouchIconElement = document.head.querySelector("link[rel='apple-touch-icon']");
    if (appleTouchIconElement) {
      appleTouchIconElement.setAttribute("href", info.appleTouchIcon);
    }
  }
}

function initBackground(info: SchemaInfo) {
  if (info.background) {
    const appElement = document.body.querySelector('.app');
    if (appElement) {
      (appElement as HTMLDivElement).style.background = info.background;
    }
  }

  if (info.contentBackground) {
    const sliderShellElement = document.body.querySelector('.sliderShell');
    if (sliderShellElement) {
      (sliderShellElement as HTMLDivElement).style.background = info.contentBackground;
    }
  }
}

function initCssVariables(cssVariables?: SchemaCSSVariables) {
  if (!cssVariables) {
    return;
  }

  const keys = Object.keys(cssVariables);
  if (keys.length > 0) {
    const content = keys.map(key => {
      const val = cssVariables[key];
      if (!val) {
        return false;
      }
      return `${key}:${val}`;
    }).filter(Boolean).join(';');

    let cssVariablesStyleElement =  document.head.querySelector("style[slider-css-variables]");
    const needCreateNew = !cssVariablesStyleElement;
    if (needCreateNew) {
      cssVariablesStyleElement = document.createElement("style");
      cssVariablesStyleElement.setAttribute('slider-css-variables', '');
    }
    cssVariablesStyleElement!.textContent = `:root {${content}}`;
    if (needCreateNew) {
      document.head.append(cssVariablesStyleElement!);
    }
  }
}

export function initializeDocument(schema: SliderSchema | null) {
  initContextmenu();

  const info = schema?.info;
  if (info) {
    initDocumentTitle(info);
    initDocumentLanguage(info);
    initDocumentFaviconIcon(info);
    initDocumentDescription(info);
    initDocumentThemeColor(info);
    initViewport(info);
    initStatusBarStyle(info);
    initAppTouchIcon(info);
    initBackground(info);
  }
  initCssVariables(schema?.cssVariables);
}
