import { useEffect } from "react";
import { SliderSchema } from "../types/SliderSchema";

export function useSliderTitleEffect(sliderSchema: SliderSchema | null) {
  useEffect(() => {
    if (!sliderSchema) {
      return;
    }
    document.title = sliderSchema.title;
  }, [sliderSchema])
}
