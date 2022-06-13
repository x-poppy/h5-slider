import React from "react";
import { Dialog } from "react-vant";
import { SliderEffectProps } from "../../types/Component";

import fixStyles from "../../utils/alertStyleFix.module.css";

export interface AlertEffectProps extends SliderEffectProps {
  title?: string | React.ReactNode;
  message?: string;
  overlay?: boolean;
  theme?: "round";
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

async function AlertEffect(props: AlertEffectProps) {
  const replacedProps = props.variableScopes.getExpressValues([
    'title',
    'message',
    'overlay', 
    'theme', 
    'confirmButtonText', 
    'confirmButtonColor'
  ], props);
  return await Dialog.alert({
    ...replacedProps,
    className: fixStyles.main,
  });
}

export default AlertEffect;
