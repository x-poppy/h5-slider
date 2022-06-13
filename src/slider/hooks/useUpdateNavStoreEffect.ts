import { useEffect } from "react";
import { useNavigation } from "./useNavigation";
import { StoreKeyNames, useStore } from "./useStore";

export function useUpdateNavStoreEffect() {
  const store = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    store.batchUpdate({
      [StoreKeyNames.ActiveIndex]: navigation.activeIndex,
      [StoreKeyNames.TotalCount]: navigation.totalCount,
      [StoreKeyNames.ActiveIndexTimeStamp + '-' + navigation.activeIndex]: Date.now()
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.activeIndex]);
}
