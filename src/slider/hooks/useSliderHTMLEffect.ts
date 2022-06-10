import { useEffect } from "react";
import { SliderSchema } from "../types/Schema";

export function useSliderHTMLEffect(sliderSchema: SliderSchema | null) {
  useEffect(() => {
    const info = sliderSchema?.info;
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
      iconElement.setAttribute("href", info.favicon ?? "./favicon.ico");
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
    
  }, [sliderSchema])
}
