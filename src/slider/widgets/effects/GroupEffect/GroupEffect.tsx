import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { SliderEffectProps } from '../../../types/UI';

interface GroupEffectProps extends SliderEffectProps {
  mode?: 'queue' | 'parallel'
  children: ReactElement[]
}

function GroupEffect(props: GroupEffectProps) {
  const isValidChildren = Array.isArray(props.children) && props.children.length > 0;
  const [activeEffectElements, setActiveEffectElements] = useState<ReactElement[]>([]);

  const effectElementsRef = useRef<ReactElement[]>(props.children.reverse());
  const mode = props.mode ?? 'queue';
  const isQueueMode = mode === 'queue';

  useEffect(() => {
    if (!isValidChildren) {
      return;
    }

    const onEffectComplete = (err: any, data: any) => {
      if (effectElementsRef.current.length > 0) {
        if (err) {
          props.onEffectComplete?.(err);
          setActiveEffectElements([]);
        } else {
          nextEffectElement();
        }
      } else {
        props.onEffectComplete?.(err, data);
        setActiveEffectElements([]);
      }
    }

    const nextEffectElement = () => {
      if (effectElementsRef.current.length < 1) {
        return;
      }

      const nextEffectElement = effectElementsRef.current.pop() as any;
      const nextClonedEffectElement = React.cloneElement(nextEffectElement, {
        onEffectComplete
      });
      setActiveEffectElements([...activeEffectElements, nextClonedEffectElement]);
    }

    if (isQueueMode) {
      nextEffectElement();
    } else {
      props.children.forEach(() => {
        nextEffectElement();
      })
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null;
}

export default GroupEffect;
