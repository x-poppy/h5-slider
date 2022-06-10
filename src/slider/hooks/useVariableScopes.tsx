import React, { ReactNode, useContext, useMemo } from 'react';
import { createVariableScopes } from '../utils/variableScopes';
import { useSliderSchema } from './userSliderSchema';

const VariableScopesContext = React.createContext(createVariableScopes());

interface VariableScopesProviderProps {
  children?: ReactNode;
}

export function VariableScopesProvider(props: VariableScopesProviderProps) {
  const sliderSchema = useSliderSchema();
  const definitions = sliderSchema?.definitions;

  const inst = useMemo(() => {
    return createVariableScopes({
      ...definitions,
      title: sliderSchema?.info?.title ?? "",
      description: sliderSchema?.info?.description ?? ""
    })
  }, [definitions, sliderSchema?.info?.description, sliderSchema?.info?.title])

  return (
    <VariableScopesContext.Provider value={inst}>
      { props.children }
    </VariableScopesContext.Provider>
  );
}

export function useVariableScopes() {
  return useContext(VariableScopesContext);
}
