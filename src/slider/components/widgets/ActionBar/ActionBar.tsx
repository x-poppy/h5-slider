import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonSize, ButtonType } from 'react-vant';
import { SliderComponentProps } from '../../../types/Component';
import { LocaleMessageKey } from '../../../utils/language';
import { PermissionKey } from '../../../utils/permission';

import { useI18nMessageBundle } from '../../../hooks/useI18nMessageBundle';
import { usePermission } from '../../../hooks/usePermission';
import { useNavigation } from '../../../hooks/useNavigation';
import { useStore } from '../../../hooks/useStore';
import { SliderEffectElement } from '../../../types/Element';

import styles from './ActionBar.module.css';
import { getReferenceVariableValue } from '../../../utils/express';
import { useDispatchEffect } from '../../../hooks/useDispatchEffect';
import { useUpdateEffect } from 'react-vant/es/hooks';
import { callback } from '../../../utils/callback';

interface ActionBarProps extends SliderComponentProps {
  submitEffect?: SliderEffectElement;

  nextButtonDefaultEnable?: boolean;
  // bind
  nextButtonEnable?: boolean | string | string[];
  // bind
  preButtonDefaultEnable?: boolean;
  preButtonEnable?: boolean | string | string[];
  // bind

  preButtonText?: string,
  nextButtonText?: string,
  submitButtonText?: string,

  autoNext?: boolean;

  preButtonStyle?: {
    type?: ButtonType,
    size?: ButtonSize,
    color?: string,
    plain?: boolean,
    square?: boolean,
    round?: boolean,
    shadow?: boolean | 1 | 2 | 3;
  },
  nextButtonStyle?: {
    type?: ButtonType,
    size?: ButtonSize,
    color?: string,
    plain?: boolean,
    square?: boolean,
    round?: boolean,
    shadow?: boolean | 1 | 2 | 3;
  },
  submitButtStyle?: {
    type?: ButtonType,
    size?: ButtonSize,
    color?: string,
    plain?: boolean,
    square?: boolean,
    round?: boolean,
    shadow?: boolean | 1 | 2 | 3;
  },
}

const EventNames = {
  OnNextSlide: "OnNextSlide",
  OnPreSlide: "OnPreSlide",
  OnSubmitSlider: "OnSubmitSlider"
}

function ActionBar(props: ActionBarProps) {
  const i18nMessageBundle = useI18nMessageBundle();
  const permission = usePermission();
  const navigation = useNavigation();
  const store = useStore();
  const dispatchEffect = useDispatchEffect();

  const nextButtonStoreEnable = useMemo(() => {
    return getReferenceVariableValue(props.nextButtonEnable, props.nextButtonDefaultEnable ?? true, (key: string) => store.get(key) ?? false);
  }, [props.nextButtonDefaultEnable, props.nextButtonEnable, store]);

  const preButtonStoreEnable = useMemo(() => {
    return getReferenceVariableValue(props.preButtonEnable, props.preButtonDefaultEnable ?? true, (key: string) => store.get(key) ?? false);
  }, [props.preButtonDefaultEnable, props.preButtonEnable, store]);

  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  
  const hasSubmitPermission = permission.getPermission(PermissionKey.SubmitSlide, true);

  const isShowPreBtn = navigation.activeIndex > 0 && navigation.totalCount > 1;
  const isPreBtnEnabled = isShowPreBtn && navigation.activeIndex > 0 && preButtonStoreEnable;
  const isNexBtnEnabled = nextButtonStoreEnable;
  const isSubmitMode = navigation.activeIndex === navigation.totalCount - 1;
  const isSubmitBtnEnable = hasSubmitPermission && nextButtonStoreEnable && !isSubmitBtnLoading;

  const preButtonText = props.preButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.PreviousSlide);
  const nextButtonText = props.nextButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.NextSlide);
  const submitSlideText = props.submitButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.SubmitSlide);

  const onPreBtnClickHandle = useCallback(() => {
      navigation.preSlide()
    },
    [navigation],
  )

  const onNextBtnClickHandle = useCallback(() => {
      navigation.nextSlide();
    },
    [navigation],
  )

  const onSubmitBtnClickHandle = useCallback(
    async () => {
      if (!props.submitEffect) {
        return;
      }
      try {
        setIsSubmitBtnLoading(true);
        dispatchEffect(props.submitEffect, {
          eventName: EventNames.OnSubmitSlider
        });
        setIsSubmitBtnLoading(false);
      } catch (err) {
        setIsSubmitBtnLoading(false);
      }
    },
    [dispatchEffect, props.submitEffect],
  );

  useUpdateEffect(() => {
    if (!props.autoNext) return;
    if (isSubmitMode) return;
    if (!nextButtonStoreEnable) return;

    callback(() => {
      navigation.nextSlide();
    }, 300);
  }, [nextButtonStoreEnable]);
  
  return (
    <div className={styles.main}>
      { isShowPreBtn && (
        <>
          <Button 
            round={props.preButtonStyle?.round ?? true}
            type={props.preButtonStyle?.type ?? 'info'}
            color={props.preButtonStyle?.color}
            plain={props.preButtonStyle?.plain}
            square={props.preButtonStyle?.square}
            shadow={props.preButtonStyle?.shadow}
            loadingText={preButtonText}
            className={styles.preBtn} 
            disabled={!isPreBtnEnabled} 
            onClick={onPreBtnClickHandle}>
            { preButtonText }
          </Button>
          <div className={styles.gap} />
        </>
      )}
      { !isSubmitMode ? (
        <Button
          round={props.nextButtonStyle?.round ?? true}
          type={props.nextButtonStyle?.type ?? 'info'}
          color={props.nextButtonStyle?.color}
          plain={props.nextButtonStyle?.plain}
          square={props.nextButtonStyle?.square}
          shadow={props.nextButtonStyle?.shadow}
          loadingText={nextButtonText}
          className={styles.nextBtn} 
          disabled={!isNexBtnEnabled} 
          onClick={onNextBtnClickHandle}>
          { nextButtonText }
        </Button>
      ) : (
        <Button
          round={props.submitButtStyle?.round ?? true}
          type={props.submitButtStyle?.type ?? 'danger'}
          color={props.submitButtStyle?.color}
          plain={props.submitButtStyle?.plain}
          square={props.submitButtStyle?.square}
          shadow={props.submitButtStyle?.shadow}
          loading={isSubmitBtnLoading}
          loadingText={submitSlideText}
          disabled={!isSubmitBtnEnable}
          className={styles.submitBtn} 
          onClick={onSubmitBtnClickHandle}>
          { submitSlideText }
        </Button>
      ) }
    </div>
  );
}

export default ActionBar;
