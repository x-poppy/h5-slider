import { SliderEffectProps } from "../../types/Component";

interface NavigationEffectProps extends SliderEffectProps {
  step: number;
}

async function NavigationEffect(props: NavigationEffectProps) {
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

export default NavigationEffect;
