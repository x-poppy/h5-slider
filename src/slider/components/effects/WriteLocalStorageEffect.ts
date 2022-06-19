import { v4 as uuidv4 } from 'uuid';
import { SliderEffectProps } from "../../types/Component";

export enum WriteTypes {
  Set = 'Set',
  SetX = 'SetX',
  SetNX = 'SetNX',
}

export type StoreValueType = string | number | null;

export interface WriteLocalStorageEffectProps extends SliderEffectProps {
  writeKey: string;
  writeValue?: StoreValueType;
  writeType?: WriteTypes
  uuid?: boolean;
}

async function WriteLocalStorageEffect(props: WriteLocalStorageEffectProps) {
  if (!props.writeKey) {
    return;
  }

  const writeKey = props.writeKey;
  const writeType = props.writeType ?? WriteTypes.Set;
  const writeValue = props.writeValue ?? null;
  const isNullValue = writeValue === null || writeValue === undefined;
  const localStorage = window.localStorage;

  function writeToLocalStorage() {
    if (writeValue === '' && props.uuid) {
      localStorage.setItem(writeKey, uuidv4());
    } else {
      localStorage.setItem(writeKey, writeValue + '');
    }
  }

  const hasExist = localStorage.getItem(writeKey) !== null;
  if (writeType === WriteTypes.SetNX) {
    if (hasExist) {
      return;
    }
    writeToLocalStorage();
    return;
  } 
  
  if (writeType === WriteTypes.SetX) {
    if (!hasExist) {
      return;
    }

    if (isNullValue) {
      localStorage.removeItem(writeKey);
    } else {
      writeToLocalStorage();
    }
    return;
  }

  if (writeType === WriteTypes.Set) {
    if (isNullValue) {
      localStorage.removeItem(writeKey);
    } else {
      writeToLocalStorage();
    }
  }
}

export default WriteLocalStorageEffect;
