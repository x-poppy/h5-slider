/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { SliderComponentProps } from '../../../types/Component';
import { getURL } from '../../../utils/url';

import styles from './IFrame.module.css'

export interface IFrameProps extends SliderComponentProps {
  src?: string;
  height: string;
}
function IFrame(props: IFrameProps) {
  const src = props.src && getURL(props.src, props.$$schema.info?.baseURL);

  return (
    <iframe style={{height: props.height}} className={styles.main} src={src}/>
  );
}

export default IFrame;
