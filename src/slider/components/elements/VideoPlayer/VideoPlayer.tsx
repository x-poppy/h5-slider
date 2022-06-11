import React from 'react';
import { SliderWidgetProps } from '../../../types/Widget';

import styles from './VideoPlayer.module.css';

export interface VideoPlayerProps extends SliderWidgetProps {
  src?: string;
  type?: 'video/mp4' | 'video/ogg' | 'video/webm';
}

function VideoPlayer(props: VideoPlayerProps) {
  return (
    <video onClick={props.onClick} className={styles.main} controls>
      <source src={props.src} type={props.type ?? 'video/mp4'}></source>
    </video>
  );
}

export default VideoPlayer;
