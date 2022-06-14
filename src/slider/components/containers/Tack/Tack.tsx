import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SliderComponentProps } from '../../../types/Component';

import styles from './Tack.module.css';

export interface TackProps extends SliderComponentProps {
  elementId?: string;
  transform?: string;

  children?: ReactNode;
}


function Tack(props: TackProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!props.elementId) {
      return;
    }

    let timeHandler = 0;
    let totalTimes = 5;
    const findTargetElement = () => {
      // detect the target element 5s for every sec
      const targetElement = document.getElementById(props.elementId!);
      if (targetElement) {
        targetElement.style.position = 'relative';
        setElement(targetElement);
        return;
      }

      if (totalTimes <= 0) {
        return;
      } 

      totalTimes--;
      timeHandler = window.setTimeout(findTargetElement, 500);
    }

    findTargetElement();

    return () => {
      if (timeHandler > 0) {
        clearTimeout(timeHandler);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal((
    <div className={styles.main}>
      { props.children }
    </div>
  ), element)
}

export default Tack;
