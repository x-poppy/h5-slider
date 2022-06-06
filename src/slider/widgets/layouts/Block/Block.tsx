import React, { ReactNode } from 'react';
import classnames from 'classnames'
import { SliderWidgetProps, SpaceType } from '../../../types/UI';

import styles from './Block.module.css';

export interface BlockProps extends SliderWidgetProps {
  round?: boolean;
  shadow?: boolean;
  children: ReactNode;
  padding?: SpaceType
  background?: string;
}

function Block(props: BlockProps) {
  const round = props.round ?? true;
  const shadow = props.shadow ?? false;
  const background = props.background;
  const padding = props.padding;
  return (
    <div onClick={props.onClick} style={{background,padding}} 
      className={classnames(styles.main, round && styles.withRound, shadow && styles.withShadow)}>
      {props.children}
    </div>
  );
}

export default Block;
