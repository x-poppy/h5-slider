import { ComponentFactory } from '../utils/componentFactory';
export interface SliderEffectElement {
  $$effect: ComponentFactory;
  $$schema: SliderSchema;
  $schema: ComponentSchema;
  name: string;
}
