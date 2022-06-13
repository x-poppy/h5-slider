import React, { ReactNode } from 'react';
import classnames from 'classnames'
import { ClickAbleComponentProps, SliderComponentProps, SpaceType } from '../../../types/Component';

import styles from './Block.module.css';

export interface BlockProps extends SliderComponentProps, ClickAbleComponentProps {
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
