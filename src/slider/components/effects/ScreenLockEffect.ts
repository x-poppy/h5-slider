import { SliderEffectProps } from "../../types/Component";

interface ScreenLockEffectProps extends SliderEffectProps {
  lock?: boolean
}

async function ScreenLockEffect(props: ScreenLockEffectProps) {
  const context = props.context;
  const locked = props.lock ?? false;
  if (locked) {
    context.screenLock.lock();
  } else {
    context.screenLock.unlock();
  }
}

export default ScreenLockEffect;
