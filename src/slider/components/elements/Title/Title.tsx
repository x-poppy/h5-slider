import React, { useMemo } from 'react';
import { Typography } from 'react-vant';
import { TypographySize, TypographyTitleLevel, TypographyType } from 'react-vant/es/typography/PropsType';
import { useStore } from '../../../hooks/useStore';
import { ClickAbleComponentProps, SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

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

  text?: string
  children?: string;

  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
}

// https://react-vant.3lang.dev/components/typography
function Title(props: TitleProps) {
  const store = useStore();

  const initStyle = useMemo(() => ({
    width: props.width,
    fontSize: props.fontSize,
    color: props.fontColor,
    fontWeight: props.fontWeight,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const content = useMemo(() => {
    return getReferenceVariableValue(props.text ?? props.children, '', (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);
  
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
      { content }
    </Typography.Title>
  );
}

export default Title;
