import classNames from 'classnames';
import React, { ReactNode, useContext, useMemo, useState } from 'react';
import { Loading } from 'react-vant';
import { noop } from 'react-vant/es/utils';

import styles from './LoadingIndicator.module.css';

interface LoadingIndicatorProps {
  children?: ReactNode;
}

const LoadingIndicatorContext = React.createContext({
  start: noop,
  end: noop,
  loading: false
});

interface LoadingIndicatorProps {
  children?: ReactNode;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
  const [pendingCount, setPendingCount] = useState(0);
  const isLoading = pendingCount > 0;

  const inst = useMemo(() => {
    return {
      start: () => {
        setPendingCount((count)=> count + 1);
      },
      end: () => {
        setPendingCount((count)=> count - 1);
      },
      loading: isLoading,
    };
  }, [isLoading]);

  return (
    <LoadingIndicatorContext.Provider value={inst}>
      <div className={classNames(styles.content, isLoading && styles.contentWithDisabled)}>
        { props.children }
      </div>
      { isLoading && <Loading className={styles.spinner} type="spinner" size="3rem"/> }
    </LoadingIndicatorContext.Provider>
  );
}

export default LoadingIndicator;

export function useLoadingIndicator() {
  return useContext(LoadingIndicatorContext)
}
