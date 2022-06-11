import React, { ReactNode, useContext, useMemo, useReducer } from 'react';
import { createStorage, StoreValueType, Storage } from '../utils/storage';

const StoreContext = React.createContext(createStorage({}));

export const StoreKeyNames = {
  ActiveIndex: 'activeIndex',
  TotalCount: 'totalCount',
  StartTimeStamp: 'startTimeStamp',
  EndTimeStamp: 'endTimeStamp',
};

interface StoreProviderProps {
  data?: Record<string, StoreValueType> | null
  children?: ReactNode;
}

function invalidateStore(state: Storage, action: boolean) {
  if (action) {
    return state.clone();
  }
  return state;
}

export function StoreProvider(props: StoreProviderProps) {
  const instance = useMemo(() => {
    const store = createStorage(props.data ?? {}, {
      onUpdate: () => {
        dispatch(true);
      },
    });
    return store;
  }, [props.data]);

  const [activeStore, dispatch] = useReducer(invalidateStore, instance);
  return (
    <StoreContext.Provider value={activeStore}>
      { props.children }
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext)
}
