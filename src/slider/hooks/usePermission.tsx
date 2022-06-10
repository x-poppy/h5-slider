import React, { ReactNode, useContext, useMemo } from 'react';
import { createPermissionManager } from '../utils/permission';
import { useSliderSchema } from './userSliderSchema';

const PermissionContext = React.createContext(createPermissionManager({}));

interface PermissionProviderProps {
  children?: ReactNode;
}
export function PermissionProvider(props: PermissionProviderProps) {
  const sliderSchema = useSliderSchema();

  const instance = useMemo(() => {
    const definitions = sliderSchema?.definitions;
    const permissions = definitions?.Permissions;
    return createPermissionManager(permissions ?? {});
  }, [sliderSchema?.definitions])

  return (
    <PermissionContext.Provider value={instance}>
      { props.children }
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  return useContext(PermissionContext);
}
