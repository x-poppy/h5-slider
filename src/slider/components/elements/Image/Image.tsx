import React from 'react';
import { Image as OriginImage, ImageFit } from 'react-vant';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';
import { getURL } from '../../../utils/url';

import styles from './Image.module.css';

export interface ImageProps extends SliderComponentProps, ClickAbleComponentProps {
  width?: number | string;
  height?: number | string;
  alt?: string;
  src?: string;
  // 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fit?: ImageFit;
  round?: boolean;
  radius: string | number;
}

// https://react-vant.3lang.dev/en/components/image
function Image(props: ImageProps) {
  const src = props.src && getURL(props.src, props.$$schema.info?.baseURL);
  return (
    <OriginImage 
      onClick={props.onClick}
      className={styles.main}
      lazyload={false}
      showError 
      showLoading 
      alt={props.alt}
      width={props.width}
      height={props.height}
      round={props.round} 
      radius={props.radius}
      src={src}
      fit={props.fit} >
    </OriginImage>
  );
}

export default Image;
