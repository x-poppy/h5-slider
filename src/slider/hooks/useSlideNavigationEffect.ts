import { useNavigationItemContext } from "../utils/NavigationItemContext";
import { useSliderContext } from "../utils/SliderContext";

export function useSlideNavigationEffect() {
  const sliderContext = useSliderContext();
  const navigationItemContext = useNavigationItemContext();

  const activeSlideIndex = sliderContext.navigation.activeIndex;
  const currentSlideIndex = navigationItemContext.index;
  const distance = Math.abs(currentSlideIndex - activeSlideIndex);
  const isActiveSlide = distance === 0;

  return {
    activeIndex: activeSlideIndex,
    currentIndex: currentSlideIndex,
    distance,
    isActiveSlide,
  }
}
