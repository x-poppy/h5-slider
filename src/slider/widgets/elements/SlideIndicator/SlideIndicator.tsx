import React from 'react';
import { Progress } from 'react-vant';
import styles from './SlideIndicator.module.css';

import { SliderWidgetProps } from '../../../types/Widget';
import { useNavigation } from '../../../hooks/useNavigation';

const format = (rate: number) => Math.min(Math.max(rate, 0), 100);

export interface SlideIndicatorProps extends SliderWidgetProps {
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  textColor?: string;
  showPivot?: boolean
  pivotText?: string;
  pivotColor?: string;
}

function SlideIndicator(props: SlideIndicatorProps) {
  const navigation = useNavigation();
  const activeIndex = navigation.activeIndex + 1;
  const totalCount = navigation.totalCount;

  const progress = totalCount === 0 ? 0 : format((activeIndex / totalCount) * 100);
  const pivotText = props.pivotText ?? `${activeIndex}/${totalCount}`;
  return (
    <div onClick={props.onClick} className={styles.main} >
      <Progress
        percentage={progress} 
        strokeWidth={props.strokeWidth}
        color={props.color}
        textColor={props.textColor}
        trackColor={props.trackColor}
        pivotColor={props.pivotColor}
        pivotText={pivotText} 
      />
    </div>
  );
}

export default SlideIndicator;
