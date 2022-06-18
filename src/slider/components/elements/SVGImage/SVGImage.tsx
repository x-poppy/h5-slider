import React, { useEffect, useState } from 'react';
import { callback } from '../../../utils/callback';
import { getURL } from '../../../utils/url';
import { ImageProps } from '../Image/Image';

import styles from './SVGImage.module.css';

function SVGImage(props: ImageProps) {
  const src = props.src && getURL(props.src, props.$$schema.info?.baseURL);

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (!src) {
      return;
    }
    
    if (!src.endsWith('.svg')) {
      return;
    }

    const controller = new AbortController();
    callback(async () => {
      const response =  await fetch(src, {
        signal: controller.signal,
      })
      const responseText = await response.text();
      // const transformedText = replaceTextByVariables(responseText, props.$$schema.cssVariables);
      setContent(responseText);
    });
  
    return () => {
      controller.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return (
    <div className={styles.main} dangerouslySetInnerHTML={{__html: content}}>
    </div>
  );
}

export default SVGImage;
