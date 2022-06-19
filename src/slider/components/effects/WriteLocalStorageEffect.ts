import { v4 as uuidv4 } from 'uuid';
import { SliderEffectProps } from "../../types/Component";

export enum WriteModes {
  Set = 'Set',
  SetX = 'SetX',
  SetNX = 'SetNX',
}

export type StoreValueType = string | number | null;

export interface WriteLocalStorageEffectProps extends SliderEffectProps {
  value?: StoreValueType;
  mode?: WriteModes
  uuid?: boolean;
}

async function WriteLocalStorageEffect(props: WriteLocalStorageEffectProps) {
  const writeKey = props.name;
  const writeMode = props.mode ?? WriteModes.Set;
  const writeValue = props.value ?? null;
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
  if (writeMode === WriteModes.SetNX) {
    if (hasExist) {
      return;
    }
    writeToLocalStorage();
    return;
  } 
  
  if (writeMode === WriteModes.SetX) {
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

  if (writeMode === WriteModes.Set) {
    if (isNullValue) {
      localStorage.removeItem(writeKey);
    } else {
      writeToLocalStorage();
    }
  }
}

export default WriteLocalStorageEffect;
