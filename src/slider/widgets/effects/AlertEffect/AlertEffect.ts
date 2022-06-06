import React, { useMemo } from "react";
import { Dialog } from "react-vant";
import { useAsyncEffect } from "../../../hooks/useAsyncEffect";
import { SliderEffectProps } from "../../../types/UI";
import { useSliderContext } from "../../../utils/SliderContext";
import styles from "./AlertEffect.module.css";

export interface AlertEffectProps extends SliderEffectProps {
  title?: string | React.ReactNode;
  message?: string;
  overlay?: boolean;
  theme?: "round";
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

function AlertEffect(props: AlertEffectProps) {
  const { variableScopeManager } = useSliderContext();

  const replacedProps = useMemo(() => {
    return variableScopeManager.getExpressValues([
      'title', 'message', 'overlay', 'theme', 'confirmButtonText', 'confirmButtonColor'
    ], props)
  }, [props, variableScopeManager]);

  useAsyncEffect(async () => {
    await Dialog.alert({
      ...replacedProps,
      className: styles.main,
    });
    props.onEffectComplete?.();
  }, [props.event, props.onEffectComplete]);
  return null;
}

export default AlertEffect;
