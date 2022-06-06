import { isPlainValue } from "./typeDetect";

type StoreValueType = string | number | boolean | null;

export interface StoreManager {
  clear(): void;
  delete(key: string): boolean;
  get<T=StoreValueType>(key: string): T | undefined;
  has(key: string): boolean;
  set(key: string, value: StoreValueType): this;
  readonly size: number;
}

export function createStoreManager(data: Record<string, StoreValueType>): StoreManager {
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
    },
    delete(key: string): boolean {
      return store.delete(key);
    },
    get(key: string): StoreValueType | undefined {
      return store.get(key);
    },
    has(key: string): boolean {
      return store.has(key);
    },
    set(key: string, val: StoreValueType) {
      store.set(key, val);
      return api;
    },
    get size() {
      return store.size
    }
  }

  return api as StoreManager;
}
