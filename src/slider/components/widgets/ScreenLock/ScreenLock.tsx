import React, { ReactNode, useEffect, useMemo } from 'react';
import { useUILock } from '../../../hooks/useUILock';
import { useStore } from '../../../hooks/useStore';
import { getReferenceVariableValue } from '../../../utils/express';

import styles from './ScreenLock.module.css'
import { useOverlap } from '../../../hooks/userOverlap';
import ReactDOM from 'react-dom';

interface ScreenLockProps {
  lock?: string | string[]
  children?: ReactNode;
}

function ScreenLock(props: ScreenLockProps) {
  const screenLocker = useUILock();
  const overlay = useOverlap();

  const store = useStore();
  const lock = useMemo(() => {
    return getReferenceVariableValue(props.lock, false, (key: string) => store.get(key));
  }, [props.lock, store]);

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (lock) {
      screenLocker.lock();
    } 
    return () => {
      screenLocker.unlock();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!lock) {
    return null;
  }

  if (!overlay.overlap) {
    return;
  }

  return ReactDOM.createPortal((
    <div className={styles.main}>
      { props.children }
    </div>
  ), overlay.overlap);
}

export default ScreenLock;
