import React, { useMemo } from 'react';
import OriginQRCode from 'qrcode.react';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';
import { useStore } from '../../../hooks/useStore';
import { getURL } from '../../../utils/url';
import { useVariableScopes } from '../../../hooks/useVariableScopes';

export interface QRCodeProps extends SliderComponentProps {
  // bind
  content?: string;
  color?: string;
  backGroundColor?: string;
  includeMargin?: boolean;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  avatar?: {
    url: string;
    height: number;
    width: number;
    excavate: boolean
  }
}

// https://github.com/zpao/qrcode.react
function QRCode(props: QRCodeProps) {
  const store = useStore();
  const variableScopes = useVariableScopes();
  
  const avatar = useMemo(() => {
    if (!props.avatar) {
      return undefined;
    }
    const src = getURL(props.avatar.url, props.$$schema.info?.baseURL);
    return {
      src,
      width: props.avatar.width,
      height: props.avatar.height,
      excavate: props.avatar?.excavate ?? false,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = useMemo(() => {
    return getReferenceVariableValue(
        variableScopes.getExpressValue(props.content ?? ''), '', 
        (key: string) => store.get(key));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.content]);

  return (
    <OriginQRCode 
      value={content} 
      size={props.size}
      fgColor={props.color}
      imageSettings={avatar}
      bgColor={props.backGroundColor}  
      level={props.level}
      includeMargin={props.includeMargin ?? false}
      />
  );
}

export default QRCode;
