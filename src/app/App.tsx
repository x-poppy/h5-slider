import React from 'react';
import SliderShell from '../slider';
import styles from './App.module.css';

// https://react-vant.3lang.dev/
function App() {
  return (
    <div className={`${styles.main} app`}>
      <SliderShell />
    </div>
  );
}

export default App;
