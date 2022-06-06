import React, { ReactNode } from 'react';

import styles from './NoImplement.module.css'

export interface NoImplementProps {
  componentName?: string;
  children?: ReactNode;
}
function NoImplement(props: NoImplementProps) {

  const errorMessage = props.componentName ?
    `'${props.componentName}' Not Implement`:
    "Not Implement Error";

  return (
    <div className={styles.main}>
      { props.children }
      <span className={styles.desc}>{errorMessage}</span>
    </div>
  );
}

export default NoImplement;
