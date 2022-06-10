import React, { useCallback } from 'react';
import { SliderWidgetProps } from '../../../types/Widget';
import styles from './AudioPlayer.module.css';

export interface AudioPlayerProps extends SliderWidgetProps {
  src?: string;
  type?: 'audio/mpeg' | 'audio/mpeg' | 'audio/ogg audio/wav';
}

function AudioPlayer(props: AudioPlayerProps) {
  const onClickHandler = useCallback(
    (evt: any) => {
      props.onClick?.(evt);
    },
    [props],
  )
  return (
    <audio tabIndex={-1} className={styles.main} controls onClick={onClickHandler}>
      <source src={props.src} type={props.type ?? 'audio/mpeg'} />
    </audio>
  );
}

export default AudioPlayer;
