import React, { useMemo } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyTitleLevel, TypographyType } from 'react-vant/es/typography/PropsType';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';

export interface TitleProps extends SliderComponentProps, ClickAbleComponentProps {
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

  fontSize?: string;
  color?: string;
}

// https://react-vant.3lang.dev/components/typography
function Title(props: TitleProps) {

  const initStyle = useMemo(() => ({
    width: props.width,
    fontSize: props.fontSize,
    color: props.color
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);
  
  return (
    <Typography.Title style={initStyle} 
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
