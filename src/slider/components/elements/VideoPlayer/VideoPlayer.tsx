import React from 'react';
import { SliderComponentProps } from '../../../types/Component';
import { getURL } from '../../../utils/url';

import styles from './VideoPlayer.module.css';

export interface VideoPlayerProps extends SliderComponentProps {
  src?: string;
  type?: 'video/mp4' | 'video/ogg' | 'video/webm';
}

function VideoPlayer(props: VideoPlayerProps) {
  const src = props.src && getURL(props.src, props.$$schema.info?.baseURL);
  return (
    <video className={styles.main} controls>
      <source src={src} type={props.type ?? 'video/mp4'}></source>
    </video>
  );
}

export default VideoPlayer;
