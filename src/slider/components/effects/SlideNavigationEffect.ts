import { SliderEffectProps } from "../../types/Component";

interface SlideNavigationEffectProps extends SliderEffectProps {
  step: number;
}

async function SlideNavigationEffect(props: SlideNavigationEffectProps) {
  const context = props.context;
  const { navigation } = context;
  
  const step = props.step ?? 0;
  if (step === 1) {
    navigation.nextSlide();
  } else if (step === -1) {
    navigation.preSlide();
  } else {
    navigation.gotoSlide(navigation.activeIndex + step);
  }
}

export default SlideNavigationEffect;
