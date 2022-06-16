import React from 'react';
import { HttpClientProvider } from '../../hooks/useHttpClient';
import { InitialConfig, InitialConfigProvider } from '../../hooks/useInitialConfig';
import { UILockProvider } from '../../hooks/useUILock';
import { ScriptContextProvider } from '../../hooks/useScriptContext';
import ErrorBoundary from '../ErrorBoundary';
import LoadingIndicator from '../LoadingIndicator';
import SliderLoader from '../SliderLoader';

import styles from './SliderShell.module.css';
import { OverlapProvider } from '../../hooks/userOverlap';

interface SliderShellProps {
  initialConfig?: InitialConfig
}

export default function SliderShell(props: SliderShellProps) {
  return (
    <div className={`${styles.main} sliderShell`}>
      <ErrorBoundary>
        <InitialConfigProvider initialConfig={props.initialConfig}>
          <HttpClientProvider>
              <LoadingIndicator>
                <UILockProvider>
                  <ScriptContextProvider>
                    <OverlapProvider>
                      <SliderLoader />
                    </OverlapProvider>
                  </ScriptContextProvider>
                </UILockProvider>
              </LoadingIndicator>
          </HttpClientProvider>
        </InitialConfigProvider>
      </ErrorBoundary>
    </div>
  )
}
