import React, { ReactNode, useContext, useMemo } from "react";

export interface NavigationItemContext {
  index: number,
}

const NavigationItemReactContext = React.createContext<NavigationItemContext>({
  index: 0,
})

const NavigationItemReactContextProvider = NavigationItemReactContext.Provider;

export interface NavigationItemContextProviderProps {
  index: number;
  children?: ReactNode;
}
export function NavigationItemContextProvider(props: NavigationItemContextProviderProps) {
  const apiInstance = useMemo(() => {
    return {
      index: props.index
    }
  }, [props.index]);
  return (
    <NavigationItemReactContextProvider value={apiInstance}>
      { props.children }
    </NavigationItemReactContextProvider>
  );
}

export function useNavigationItemContext() {
  return useContext(NavigationItemReactContext);
}
