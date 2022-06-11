import { filterObjectByMatcher } from "./object";
import { trimPrefix } from "./string";
import { isPlainValue } from "./typeDetect";

export type StoreValueType = string | number | boolean | null;

export interface Storage {
  delete(key: string): void;
  get<T=StoreValueType>(key: string): T | undefined;
  has(key: string): boolean;
  set(key: string, value: StoreValueType): void;
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
    if (isPlainValue(val)) {
      map[trimPrefixKey] = val;
    }
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
      store.set(key, trimPrefixKey);
      changed && opts?.onUpdate?.();
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
  const jsonData = store.toJSON();
  return filterObjectByMatcher(jsonData, matcher, false);
}
