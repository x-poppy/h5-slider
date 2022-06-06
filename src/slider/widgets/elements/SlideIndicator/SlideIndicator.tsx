import React from 'react';
import { Progress } from 'react-vant';
import styles from './SlideIndicator.module.css';

import { useSliderContext } from '../../../utils/SliderContext';
import { SliderWidgetProps } from '../../../types/UI';

const format = (rate: number) => Math.min(Math.max(rate, 0), 100);

function SlideIndicator(props: SliderWidgetProps) {
  const stageAPI = useSliderContext();
  const navigation = stageAPI.navigation;
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
