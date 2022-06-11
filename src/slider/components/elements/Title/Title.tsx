import React from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyTitleLevel, TypographyType } from 'react-vant/es/typography/PropsType';
import { SliderWidgetProps } from '../../../types/Widget';

export interface TitleProps extends SliderWidgetProps {
  width?: string | number
  type?: TypographyType;
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
