import React from 'react';
import classnames from 'classnames';

import { SliderWidgetProps } from '../../../types/Widget';

import styles from './RichText.module.css'

interface RichTextProps extends SliderWidgetProps {
  block?: boolean
  children?: string;
}

function RichText(props: RichTextProps) {
  const context = typeof props.children === 'string' ? props.children : '';
  return (
    <div
      className={classnames(styles.main, 
          props.block && styles.withBlock)} 
        dangerouslySetInnerHTML={{__html: context}} 
      />
  );
}

export default RichText;
