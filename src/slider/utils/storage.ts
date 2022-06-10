import { filterObjectByKeys } from "./object";
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
  onUpdate?: () => void;
}

export function createStorage(data: Record<string, StoreValueType>, opts?: CreateStorageOpts): Storage {
  const transformedData = Object.keys(data ?? {}).reduce((map, key) => {
    const val = data[key];
    if (isPlainValue(val)) {
      map[key] = val;
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
      store.delete(key);
      opts?.onUpdate?.();
    },
    get(key: string): StoreValueType | undefined {
      return store.get(key);
    },
    has(key: string): boolean {
      return store.has(key);
    },
    set(key: string, val: StoreValueType) {
      const changed = store.get(key) !== val;
      store.set(key, val);
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
  return filterObjectByKeys(jsonData, matcher);
}
