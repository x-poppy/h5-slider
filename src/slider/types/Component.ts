import { useHttpClient } from '../hooks/useHttpClient';
import { useI18nMessageBundle } from '../hooks/useI18nMessageBundle';
import { useInitialConfig } from '../hooks/useInitialConfig';
import { useNavigation } from '../hooks/useNavigation';
import { useStore } from '../hooks/useStore';
import { useUILock } from '../hooks/useUILock';
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

interface SliderEffectContext {
  initialConfig: ReturnType<typeof useInitialConfig>;
  variableScopes: ReturnType<typeof useVariableScopes>;
  i18nMessageBundle: ReturnType<typeof useI18nMessageBundle>;
  store: ReturnType<typeof useStore>;
  httpClient: ReturnType<typeof useHttpClient>
  navigation: ReturnType<typeof useNavigation>
  screenLock: ReturnType<typeof useUILock>
}

export interface SliderEffectProps extends SliderComponentProps {
  $$effect: ComponentFactory;
  event: SlideEffectEvent;
  context: SliderEffectContext;
}
