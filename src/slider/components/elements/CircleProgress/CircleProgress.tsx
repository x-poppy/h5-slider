import React, { useMemo } from 'react';
import { Circle, CircleStartPosition } from 'react-vant';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

// https://react-vant.3lang.dev/components/circle
export interface CircleProgressProps extends SliderComponentProps {
  size?: number | string;
  defaultRate?: number;
  rate: number;
  color: string | Record<string, any>;
  layerColor: string;
  fill: string;
  speed?: number;
  text?: string;
  strokeWidth: number | string;
  strokeLinecap?: 'square' |  'butt';
  clockwise?: boolean;
  startPosition?: CircleStartPosition
}
function CircleProgress(props: CircleProgressProps) {
  const store = useStore();

  const rate = useMemo(() => {
    return getReferenceVariableValue(props.rate, 0, (key: string) => store.get(key));
  }, [props.rate, store]);

  const text = useMemo(() => {
    return getReferenceVariableValue(props.text, '', (key: string) => store.get(key));
  }, [props.text, store]);
  
  return (
    <Circle 
      defaultRate={props.defaultRate}
      rate={rate}
      size={props.size}
      color={props.color}
      layerColor={props.layerColor}
      fill={props.fill}
      speed={props.speed}
      text={text}
      strokeWidth={props.strokeWidth}
      startPosition={props.startPosition}
    />
  );
}

export default CircleProgress;
