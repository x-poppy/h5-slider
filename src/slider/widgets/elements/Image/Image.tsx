import React from 'react';
import { Image as OriginImage, ImageFit } from 'react-vant';
import { SliderWidgetProps } from '../../../types/UI';

import styles from './Image.module.css'

interface ImageProps extends SliderWidgetProps {
  width?: number | string;
  height?: number | string;
  alt?: string;
  src?: string;
  fit?: ImageFit;
  round?: boolean;
  radius: string | number;
}

// https://react-vant.3lang.dev/en/components/image
function Image(props: ImageProps) {
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
      src={props.src}
      fit={props.fit} >
    </OriginImage>
  );
}

export default Image;
