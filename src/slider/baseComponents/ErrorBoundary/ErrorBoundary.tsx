import React, { Component, ReactNode } from "react";
import { Button, Empty } from 'react-vant';
import { getMessage, LocaleMessageKey } from "../../utils/language";

import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  error?: any;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: props.error ?? null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: error };
  }

  onRefreshBtnClick() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      const description = getMessage(LocaleMessageKey.PageErrorDesc);
      const refreshText = getMessage(LocaleMessageKey.Refresh);

      return (
        <Empty className={styles.main} image="./images/error.png" description={description}>
          <Button className={styles.refreshBtn} onClick={this.onRefreshBtnClick} round type="info">{refreshText}</Button>
        </Empty>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
