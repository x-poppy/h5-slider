import React, { Component, ReactNode } from "react";
import { Button, Empty } from 'react-vant';
import { getLocaleMessage, LocaleMessageKey } from "../../slider/utils/language";

import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps{
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: false
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  onRefreshBtnClick() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      const description = getLocaleMessage(LocaleMessageKey.PageErrorDesc);
      const refreshText = getLocaleMessage(LocaleMessageKey.Refresh)
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
