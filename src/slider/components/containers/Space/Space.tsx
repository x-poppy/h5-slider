import React, { ReactNode, useMemo } from 'react';
import { Space as OriginSpace } from 'react-vant';
import { ClickAbleComponentProps, SliderComponentProps, SpaceType } from '../../../types/Component';

import styles from './Space.module.css';

export interface SpaceBoxProps extends SliderComponentProps, ClickAbleComponentProps {
  block?: boolean
  children: ReactNode;
  gap?: SpaceType
  padding?: string;
  margin?: string;
  width?: string
  height?: string
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
}

// https://react-vant.3lang.dev/en/components/space
function Space(props: SpaceBoxProps) {
  const initStyle = useMemo(() => ({
    padding: props.padding,
    width: props.width,
    height: props.height,
    margin: props.margin,
    // eslint-disable-next-line
  }), []);

  return (
    <OriginSpace onClick={props.onClick} className={styles.main} 
      style={initStyle}
      wrap 
      block={props.block}
      direction={props.direction} 
      align={props.align} 
      justify={props.justify} 
      gap={props.gap}>
      { props.children }
    </OriginSpace>
  );
}

export default Space;
