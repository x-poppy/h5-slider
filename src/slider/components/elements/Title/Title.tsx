import React from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyTitleLevel, TypographyType } from 'react-vant/es/typography/PropsType';
import { SliderComponentProps } from '../../../types/Component';

export interface TitleProps extends SliderComponentProps {
  width?: string | number
  // 'danger' | 'secondary' | 'light' | 'primary' | 'success' | 'warning';
  type?: TypographyType;
  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  size?: TypographySize;
  disabled?: boolean;
  delete?: boolean;
  underline?: boolean;
  center?: boolean;
  level?: TypographyTitleLevel;
  strong?: boolean;
  ellipsis?: boolean | number;
  children?: React.ReactNode;
}

// https://react-vant.3lang.dev/components/typography
function Title(props: TitleProps) {
  return (
    <Typography.Title style={{width: props.width}} 
      onClick={props.onClick}
      type={props.type}
      size={props.size}
      disabled={props.disabled}
      delete={props.delete}
      underline={props.underline}
      center={props.center}
      strong={props.strong}
      ellipsis={props.ellipsis}
    >
      {props.children}
    </Typography.Title>
  );
}

export default Title;
