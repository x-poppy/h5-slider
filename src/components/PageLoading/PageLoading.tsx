import React from 'react';
import { Space, Loading } from 'react-vant';

import styles from './PageLoading.module.css'

function PageLoading() {
  return (
    <Space className={styles.main} justify="center" align="center" block direction="vertical">
      <Loading type="spinner" />
    </Space>
  );
}

export default PageLoading;
