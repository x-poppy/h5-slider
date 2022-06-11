import { useEffect } from "react";
import { useNavigation } from "./useNavigation";
import { StoreKeyNames, useStore } from "./useStore";

export function useSlideIndxWithStoreEffect() {
  const store = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    store.set(StoreKeyNames.ActiveIndex, navigation.activeIndex);
    store.set(StoreKeyNames.TotalCount, navigation.totalCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.activeIndex]);
}
