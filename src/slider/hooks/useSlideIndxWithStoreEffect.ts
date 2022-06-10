import { useEffect } from "react";
import { useNavigation } from "./useNavigation";
import { useStore } from "./useStore";

export function useSlideIndxWithStoreEffect() {
  const store = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    store.set('activeIndex', navigation.activeIndex);
    store.set('totalCount', navigation.totalCount);
  }, [navigation.activeIndex, navigation.totalCount, store]);
}