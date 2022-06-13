import React, { useCallback, useMemo, useState } from 'react';
import { Button as OriginButton, ButtonSize, ButtonType } from 'react-vant';
import { useLoadingIndicator } from '../../../baseComponents/LoadingIndicator';
import { useStore } from '../../../hooks/useStore';
import { useVariableScopes } from '../../../hooks/useVariableScopes';
import { SliderEffectElement } from '../../../types/Element';

import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';

export interface ButtonProps extends SliderComponentProps {
  type?: ButtonType,
  size?: ButtonSize,
  color?: string,
  plain?: boolean,
  square?: boolean,
  round?: boolean,
  shadow?: boolean | 1 | 2 | 3;
  // runtime bindable
  disabled?: boolean | string | string[];
  children?: string;
  screenBusy?: false,
  //events
  clickEffect?: SliderEffectElement;
}

const EventNames = {
  OnClick: "onClick",
}

function Button(props: ButtonProps) {
  const store = useStore();
  useVariableScopes()
  const loadIndicator = useLoadingIndicator();
  const [isLoading, setIsLoading] = useState(false);
  const dispatchEffect = useDispatchEffect();
  
  const disabled = useMemo(() => {
    return getReferenceVariableValue(props.disabled, false, (key: string) => store.get(key));
  }, [props.disabled, store]);

  const onClickHandle = useCallback(async () => {
    if (!props.clickEffect) {
      return;
    }
    try {
      setIsLoading(true);
      if (props.screenBusy) {
        loadIndicator.start();
      }

      await dispatchEffect(props.clickEffect, {
        eventName: EventNames.OnClick
      });

      setIsLoading(false);
      if (props.screenBusy) {
        loadIndicator.end();
      }
    } catch (err) {
      setIsLoading(false);
      if (props.screenBusy) {
        loadIndicator.end();
      }
    }
  }, [dispatchEffect, loadIndicator, props.clickEffect, props.screenBusy]);

  const isTextContent = typeof props.children === 'string';
  return (
    <OriginButton
      onClick={onClickHandle}
      disabled={disabled || isLoading}
      loading={isLoading}
      loadingText={ isTextContent ? props.children : undefined }
      round={props.round}
      type={props.type}
      color={props.color}
      plain={props.plain}
      square={props.square}
      shadow={props.shadow}
    >
      { props.children }
    </OriginButton>
  );
}

export default Button;
