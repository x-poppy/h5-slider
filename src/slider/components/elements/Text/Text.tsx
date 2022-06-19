import React, { useMemo } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyType } from 'react-vant/es/typography/PropsType';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';

export interface TextProps extends SliderComponentProps, ClickAbleComponentProps {
  width?: string | number
  type?: TypographyType;
  size?: TypographySize;
  disabled?: boolean;
  delete?: boolean;
  underline?: boolean;
  center?: boolean;
  strong?: boolean;
  ellipsis?: boolean | number;
  children?: React.ReactNode;

  fontSize?: string;
  color?: string;
}

function Text(props: TextProps) {

  const initStyle = useMemo(() => ({
    width: props.width,
    fontSize: props.fontSize,
    color: props.color
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <Typography.Text style={initStyle} 
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
    </Typography.Text>
  );
}

export default Text;
