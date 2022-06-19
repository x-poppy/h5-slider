import React from 'react';
import { Arrow, Lock, Share,ShareO, Award, Search,WechatPay, Alipay,Replay, ArrowLeft,Info, InfoO , WapNav, MedalO } from '@react-vant/icons';

import { SliderComponentProps } from '../../../types/Component';


const EmbedIcons: Record<string, any> = {
  Alipay,
  Arrow,
  ArrowLeft,
  Lock,
  Share,
  ShareO,
  WechatPay,
  InfoO,
  Info,
  WapNav,
  MedalO,
  Replay,
  Award,
  Search,
}

export interface Iconrops extends SliderComponentProps {
  icon: string;
  color?: string;
  spin?: boolean;
  size?: string;
  rotate?: number;
}

function Icon(props: Iconrops) {
  const Template = EmbedIcons[props.icon];
  if (!Template) {
    return null;
  }

  return (
    <Template 
      color={props.color}
      fontSize={props.size}
      spin={props.spin}
      rotate={props.rotate}
    />
  );
}

export default Icon;
