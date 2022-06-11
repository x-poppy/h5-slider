import React, { ReactElement, useRef, useState } from 'react';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { SliderEffectProps } from '../../../types/Widget';
interface GroupEffectProps extends SliderEffectProps {
  children: ReactElement[]
}

function GroupEffect(props: GroupEffectProps) {
  const totalCount = Array.isArray(props.children) ? props.children.length : 0;
  const activeIndexRef = useRef(0);
  const [activeEffectElement, setActiveEffectElement] = useState<ReactElement | null>(null);

  useAsyncEffect(async () => {
    if (totalCount === 0) {
      props.onEffectComplete();
      return;
    }

    const onEffectComplete = (err: any, data: any) => {
      if (activeIndexRef.current < totalCount - 1) {
        if (err) {
          setActiveEffectElement(null);
          props.onEffectComplete?.(err);
        } else {
          activeIndexRef.current = activeIndexRef.current + 1;
          nextEffectElement();
        }
      } else {
        props.onEffectComplete?.(false, data);
        setActiveEffectElement(null);
      }
    }

    const nextEffectElement = () => {
      const nextClonedEffectElement = React.cloneElement(props.children[activeIndexRef.current], {
        onEffectComplete
      });
      setActiveEffectElement(nextClonedEffectElement);
    }

    activeIndexRef.current = 0;
    nextEffectElement();
  }, [props.event], {
    popupError: true,
    valid: !!props.event
  });

  return activeEffectElement;
}

export default GroupEffect;
