import { ReactElement } from 'react';

export interface SliderEffectElement extends ReactElement {
  event: SlideEffectEvent;
  onEffectComplete: OnEffectCompleteFunction;
}
