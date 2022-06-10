import React from 'react';
import { Progress } from 'react-vant';
import styles from './SlideIndicator.module.css';

import { SliderWidgetProps } from '../../../types/Widget';
import { useNavigation } from '../../../hooks/useNavigation';

const format = (rate: number) => Math.min(Math.max(rate, 0), 100);

function SlideIndicator(props: SliderWidgetProps) {
  const navigation = useNavigation();
  const activeIndex = navigation.activeIndex + 1;
  const totalCount = navigation.totalCount;

  const progress = totalCount === 0 ? 0 : format((activeIndex / totalCount) * 100);
  const pivotText = `${activeIndex}/${totalCount}`;
  return (
    <div onClick={props.onClick} className={styles.main} >
      <Progress percentage={progress} pivotText={pivotText} />
    </div>
  );
}

export default SlideIndicator;
