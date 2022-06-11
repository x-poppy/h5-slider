import { SliderSchema, WidgetSchema } from './Schema';

export type SpaceType = '0.5rem' | '1rem' | '1.5rem' | '2rem';

export interface SliderWidgetProps {
  $$schema: SliderSchema;
  $schema: WidgetSchema;

  onClick?: (evt: React.MouseEvent<any>) => void;
}

type OnEffectCompleteFunction = (err?: any, data?: any) => void;

export interface SliderEffectProps extends SliderWidgetProps {
  event: SlideEffectEvent;
  onEffectComplete: OnEffectCompleteFunction;
}

export interface SliderStorableWidgetProps extends SliderWidgetProps {
  name: string
}
