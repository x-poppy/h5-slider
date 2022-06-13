import { useHttpClient } from '../hooks/useHttpClient';
import { useI18nMessageBundle } from '../hooks/useI18nMessageBundle';
import { useStore } from '../hooks/useStore';
import { useVariableScopes } from '../hooks/useVariableScopes';
import { ComponentFactory } from '../utils/componentFactory';
import { SliderSchema, ComponentSchema } from './Schema';

export type SpaceType = '0.5rem' | '1rem' | '1.5rem' | '2rem';

export interface SliderComponentProps {
  $$schema: SliderSchema;
  $schema: ComponentSchema;
  name: string;
}

export interface ClickAbleComponentProps {
  onClick?: (evt: React.MouseEvent<any>) => void;
}

export interface SliderEffectProps extends SliderComponentProps {
  $$effect: ComponentFactory;
  variableScopes: ReturnType<typeof useVariableScopes>;
  i18nMessageBundle: ReturnType<typeof useI18nMessageBundle>;
  store: ReturnType<typeof useStore>;
  httpClient: ReturnType<typeof useHttpClient>
  event: SlideEffectEvent;
}
