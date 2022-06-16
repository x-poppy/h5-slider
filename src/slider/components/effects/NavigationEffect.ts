import { SliderEffectProps } from "../../types/Component";

interface NavigationEffectProps extends SliderEffectProps {
  index: number;
}

async function NavigationEffect(props: NavigationEffectProps) {
  const { navigation } = props;
  let index = props.index ?? 0;
  const totalCount = navigation.totalCount;
  if (totalCount === 0) {
    return;
  } 
  index = index % totalCount;
  if (index < 0) {
    index = index + totalCount;
  }
  
  navigation.gotoSlide(index);
}

export default NavigationEffect;
