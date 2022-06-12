import React, { useCallback } from 'react';
import { SliderComponentProps } from '../../../types/Component';
import { getURL } from '../../../utils/url';
import styles from './AudioPlayer.module.css';

export interface AudioPlayerProps extends SliderComponentProps {
  src?: string;
  type?: 'audio/mpeg' | 'audio/mpeg' | 'audio/ogg audio/wav';
}

function AudioPlayer(props: AudioPlayerProps) {
  const onClickHandler = useCallback(
    (evt: any) => {
      props.onClick?.(evt);
    },
    [props],
  );
  const src = props.src && getURL(props.src, props.$$schema.info?.baseURL);
  return (
    <audio tabIndex={-1} className={styles.main} controls onClick={onClickHandler}>
      <source src={src} type={props.type ?? 'audio/mpeg'} />
    </audio>
  );
}

export default AudioPlayer;
