import { SliderEffectProps } from "../../types/Component";
import { getReferenceVariableValue } from "../../utils/express";

interface ScreenLockEffectProps extends SliderEffectProps {
  lock?: boolean
}

async function ScreenLockEffect(props: ScreenLockEffectProps) {
  const lock = getReferenceVariableValue(props.lock, false, (key: string) => props.context.store.get(key));
  const context = props.context;
  if (lock) {
    context.screenLock.lock();
  } else {
    context.screenLock.unlock();
  }
}

export default ScreenLockEffect;
