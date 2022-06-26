import { filterObjectByMatcher } from "./object";
import { trimPrefix } from "./string";

export type StoreValueType = Record<string, any> | string | number | boolean | null;

export interface Storage {
  delete(key: string): void;
  get<T=StoreValueType>(key: string): T | undefined;
  has(key: string): boolean;
  set(key: string, value: StoreValueType): void;
  batchUpdate(val: Record<string, StoreValueType>): void
  clone(): Storage;
  toJSON(): Record<string, any>;
}

interface CreateStorageOpts {
  prefix?: string;
  onUpdate?: () => void;
}

export function createStorage(data: Record<string, StoreValueType>, opts?: CreateStorageOpts): Storage {
  const transformedData = Object.keys(data ?? {}).reduce((map, key) => {
    const trimPrefixKey = trimPrefix(key, opts?.prefix);
    const val = data[trimPrefixKey];
    map[trimPrefixKey] = val;
    return map;
  }, {} as any);

  const store = new Map(Object.entries(transformedData)) as Map<string, StoreValueType>;
  const api = {
    clear() {
      store.clear();
      opts?.onUpdate?.();
    },
    delete(key: string) {
      if (!key) {
        return;
      }
      const trimPrefixKey = trimPrefix(key, opts?.prefix);
      store.delete(trimPrefixKey);
      opts?.onUpdate?.();
    },
    get(key: string): StoreValueType | undefined {
      if (!key) {
        return undefined;
      }
      const trimPrefixKey = trimPrefix(key, opts?.prefix);
      return store.get(trimPrefixKey);
    },
    has(key: string): boolean {
      if (!key) {
        return false;
      }
      const trimPrefixKey = trimPrefix(key, opts?.prefix);
      return store.has(trimPrefixKey);
    },
    set(key: string, val: StoreValueType) {
      if (!key) {
        return;
      }
      const trimPrefixKey = trimPrefix(key, opts?.prefix);
      const changed = store.get(trimPrefixKey) !== val;
      store.set(trimPrefixKey, val);
      changed && opts?.onUpdate?.();
    },
    batchUpdate(val: Record<string, StoreValueType>) {
      let isAnychanged = false;
      for (const [key, value] of Object.entries(val)) {
        const trimPrefixKey = trimPrefix(key, opts?.prefix);
        const changed = store.get(trimPrefixKey) !== value;
        store.set(trimPrefixKey, value);

        isAnychanged = isAnychanged || changed;
      }
      if (isAnychanged) {
        opts?.onUpdate?.();
      }
    },
    get size() {
      return store.size
    },
    clone():Storage  {
      return {
        ...api,
      } as Storage;
    },
    toJSON() {
      return Object.fromEntries(store)
    }
  }

  return api as Storage;
}

export function getStoreData(store: Storage,  matcher?: string | string[]) {
  if (!matcher) {
    return {};
  }
  const jsonData = store.toJSON();
  return filterObjectByMatcher(jsonData, matcher, false) as Record<string, StoreValueType>;
}
