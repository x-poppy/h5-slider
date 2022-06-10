import React, { ReactNode } from 'react';
import { Sticky as OriginSticky, StickyPosition } from 'react-vant';
import { SliderWidgetProps } from '../../../types/Widget';

export interface StickyProps extends SliderWidgetProps {
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
