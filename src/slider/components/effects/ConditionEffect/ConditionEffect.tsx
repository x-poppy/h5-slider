import React from 'react';
import { SliderEffectElement } from '../../../types/Element';
import { SliderEffectProps } from '../../../types/Widget';

export interface SwitchEffectProps extends SliderEffectProps {
  express: string;
  trueEffect: SliderEffectElement;
  falseEffect: SliderEffectElement
}

function SwitchEffect() {
  return (
    <div>
      SwitchEffect
    </div>
  );
}

export default SwitchEffect;
