import React, { useMemo } from "react";
import { Dialog } from "react-vant";
import { useAsyncEffect } from "../../../hooks/useAsyncEffect";
import { useVariableScopes } from "../../../hooks/useVariableScopes";
import { SliderEffectProps } from "../../../types/Widget";

import fixStyles from "../../../utils/alertStyleFix.module.css";

export interface AlertEffectProps extends SliderEffectProps {
  title?: string | React.ReactNode;
  message?: string;
  overlay?: boolean;
  theme?: "round";
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

function AlertEffect(props: AlertEffectProps) {
  const variableScopes = useVariableScopes();

  useAsyncEffect(async () => {
    const replacedProps = variableScopes.getExpressValues([
      'title',
      'message',
      'overlay', 
      'theme', 
      'confirmButtonText', 
      'confirmButtonColor'
    ], props);

    await Dialog.alert({
      ...replacedProps,
      className: fixStyles.main,
    });
    props.onEffectComplete?.();
  }, [props.event], {
    valid: !!props.event
  });

  return null;
}

export default AlertEffect;
