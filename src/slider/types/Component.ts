import { SliderSchema, ComponentSchema } from './Schema';

export type SpaceType = '0.5rem' | '1rem' | '1.5rem' | '2rem';

export interface SliderComponentProps {
  $$schema: SliderSchema;
  $schema: ComponentSchema;
  name: string;

  onClick?: (evt: React.MouseEvent<any>) => void;
}

type OnEffectCompleteFunction = (err?: any, data?: any) => void;

export interface SliderEffectProps extends SliderComponentProps {
  event: SlideEffectEvent;
  onEffectComplete: OnEffectCompleteFunction;
}
