import React, { useMemo } from 'react';
import classnames from 'classnames';

import { SliderComponentProps } from '../../../types/Component';

import styles from './RichText.module.css'
import { useStore } from '../../../hooks/useStore';
import { getReferenceVariableValue } from '../../../utils/express';

interface RichTextProps extends SliderComponentProps {
  block?: boolean
  text?: string
  children?: string;
}

function RichText(props: RichTextProps) {
  const store = useStore();
  const content = useMemo(() => {
    return getReferenceVariableValue(props.text ?? props.children, '', (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);
  
  return (
    <div
      className={classnames(styles.main, 
          props.block && styles.withBlock)} 
        dangerouslySetInnerHTML={{__html: content}} 
      />
  );
}

export default RichText;
