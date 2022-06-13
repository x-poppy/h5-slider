import { useEffect } from "react";
import { SliderSchema } from "../types/Schema";
import { getURL } from "../utils/url";

export function useUpdateHTMLEffect(schema: SliderSchema | null) {
  useEffect(() => {
    const info = schema?.info;
    if (!info) {
      return;
    }

    if (info.title) {
      document.title = info.title;
    }

    if (info.lang) {
      document.documentElement.setAttribute("lang", info.lang);
    }

    const iconElement = document.head.querySelector("link[rel='icon']");
    if (iconElement) {
      const faviconURL = (info.favicon && getURL(info.favicon, schema.info?.baseURL)) ?? "./favicon.ico";
      iconElement.setAttribute("href", faviconURL);
    }

    if (info.description) {
      const descElement = document.head.querySelector("meta[name='description']");
      if (descElement) {
        descElement.setAttribute("content", info.description);
      }
    }

    if (info.themeColor) {
      const descElement = document.head.querySelector("meta[name='theme-colo']");
      if (descElement) {
        descElement.setAttribute("content", info.themeColor);
      }
    }

    if (info.viewport) {
      const descElement = document.head.querySelector("meta[name='viewport']");
      if (descElement) {
        descElement.setAttribute("content", info.viewport);
      }
    }

    if (info.statusBarStyle) {
      const descElement = document.head.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");
      if (descElement) {
        descElement.setAttribute("content", info.statusBarStyle);
      }
    }

    if (info.appleTouchIcon) {
      const appleTouchIconElement = document.head.querySelector("link[rel='apple-touch-icon']");
      if (appleTouchIconElement) {
        appleTouchIconElement.setAttribute("href", info.appleTouchIcon);
      }
    }

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
    
  }, [schema])
}
