import React from 'react';
import { Progress } from 'react-vant';
import styles from './SlideIndicator.module.css';

import { SliderComponentProps } from '../../../types/Component';
import { useNavigation } from '../../../hooks/useNavigation';

const format = (rate: number) => Math.min(Math.max(rate, 0), 100);

export interface SlideIndicatorProps extends SliderComponentProps {
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  textColor?: string;
  showPivot?: boolean
  pivotText?: string;
  pivotColor?: string;
  totalOffset?: number;
}

function SlideIndicator(props: SlideIndicatorProps) {
  const navigation = useNavigation();

  const totalOffset = props.totalOffset ?? 0;
  const activeIndex = navigation.activeIndex + 1;
  const totalCount = navigation.totalCount + totalOffset;

  const progress = totalCount === 0 ? 0 : format((activeIndex / totalCount) * 100);
  const pivotText = props.pivotText ?? `${activeIndex}/${totalCount}`;
  return (
    <div className={styles.main} >
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
