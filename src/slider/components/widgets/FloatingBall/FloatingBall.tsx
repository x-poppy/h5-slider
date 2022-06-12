import React, { ReactNode } from 'react';
import { FloatingBall as OriginlFloatingBall } from 'react-vant';
import { SliderComponentProps } from '../../../types/Component';

export interface FloatingBallProps extends SliderComponentProps {
  draggable?: boolean;
  adsorb?: boolean | {
    indent?: boolean | number;
    distance?: number;
  },
  offset?: {
    left?: React.CSSProperties['left'];
    right?: React.CSSProperties['left'];
    top?: React.CSSProperties['top'];
    bottom?: React.CSSProperties['bottom'];
  },
  boundary?: boolean,
  children?: ReactNode,
}
function FloatingBall(props: FloatingBallProps) {
  return (
    <OriginlFloatingBall 
      boundary={props.boundary}
      draggable={props.draggable}
      adsorb={props.adsorb}
      offset={props.offset}
    >{ props.children }</OriginlFloatingBall>
  );
}

export default FloatingBall;
