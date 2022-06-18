import React, { useContext, useMemo } from "react";
import { ReactNode } from "react";
import { getInitialConfig } from "../utils/getInitialConfig";

export interface InitialConfig {
  [key: string]: boolean | string | number | null | undefined
}

const InitialConfigContext = React.createContext<InitialConfig>({});

interface InitialConfigProviderProps {
  initialConfig?: InitialConfig;
  children?: ReactNode
}
export function InitialConfigProvider(props: InitialConfigProviderProps) {
  const initialConfig = useMemo(() => {
    const config = getInitialConfig();
    return {
      ...props.initialConfig,
      ...config,
    };
  // eslint-disable-next-line 
  }, []);

  return (
    <InitialConfigContext.Provider value={initialConfig}>
      { props.children }
    </InitialConfigContext.Provider>
  );
}

export function useInitialConfig() {
  return useContext(InitialConfigContext);
}
