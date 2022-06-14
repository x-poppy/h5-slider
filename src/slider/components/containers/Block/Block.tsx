import React, { ReactNode, useMemo } from 'react';
import classnames from 'classnames'
import { ClickAbleComponentProps, SliderComponentProps, SpaceType } from '../../../types/Component';

import styles from './Block.module.css';

export interface BlockProps extends SliderComponentProps, ClickAbleComponentProps {
  round?: boolean;
  shadow?: boolean;
  children: ReactNode;
  padding?: string;
  margin?: string;
  width?: string
  height?: string
  background?: string;
}

function Block(props: BlockProps) {
  const shadow = props.shadow ?? false;
  const round = props.round ?? true;

  const initStyle = useMemo(() => ({
    round: props.round ?? true,
    shadow: props.shadow ?? false,
    background: props.background,
    padding: props.padding,
    width: props.width,
    height: props.height,
    margin: props.margin,
    // eslint-disable-next-line
  }), []);

  return (
    <div onClick={props.onClick} style={initStyle} 
      className={classnames(styles.main, round && styles.withRound, shadow && styles.withShadow)}>
      {props.children}
    </div>
  );
}

export default Block;
