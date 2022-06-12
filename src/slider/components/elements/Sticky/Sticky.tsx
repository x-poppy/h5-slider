import React, { ReactNode } from 'react';
import { Sticky as OriginSticky, StickyPosition } from 'react-vant';
import { SliderComponentProps } from '../../../types/Component';

export interface StickyProps extends SliderComponentProps {
  position?: StickyPosition;
  offsetTop?: string | number;
  offsetBottom?: string | number;
  zIndex?: number;
  children?: ReactNode
}
function Sticky(props: StickyProps) {
  return (
    <OriginSticky 
      position={props.position} 
      offsetTop={props.offsetTop} 
      offsetBottom={props.offsetBottom}
      zIndex={props.zIndex}
      >
      { props.children }
    </OriginSticky>
  );
}

export default Sticky;
