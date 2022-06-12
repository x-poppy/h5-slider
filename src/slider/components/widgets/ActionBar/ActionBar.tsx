import React, { useCallback, useMemo, useState } from 'react';
import { Button, ButtonSize, ButtonType } from 'react-vant';
import { SliderComponentProps } from '../../../types/Component';
import { LocaleMessageKey } from '../../../utils/language';
import { PermissionKey } from '../../../utils/permission';

import { useEffectElement } from '../../../hooks/useEffectElement';
import { useI18nMessageBundle } from '../../../hooks/useI18nMessageBundle';
import { usePermission } from '../../../hooks/usePermission';
import { useNavigation } from '../../../hooks/useNavigation';
import { useStore } from '../../../hooks/useStore';
import { SliderEffectElement } from '../../../types/Element';

import styles from './ActionBar.module.css';
import { getReferenceVariableValue } from '../../../utils/express';

interface ActionBarProps extends SliderComponentProps {
  preSlideEffect?: SliderEffectElement;
  nextSlideEffect?: SliderEffectElement;
  submitEffect?: SliderEffectElement;

  // bind
  nextButtonEnable?: boolean | string | string[];
  // bind
  preButtonEnable?: boolean | string | string[];
  // bind

  preButtonText?: string,
  nextButtonText?: string,
  submitButtonText?: string,

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

  const nextButtonStoreEnable = useMemo(() => {
    return getReferenceVariableValue(props.nextButtonEnable, true, (key: string) => store.get(key) ?? false);
  }, [props.nextButtonEnable, store]);

  const preButtonStoreEnable = useMemo(() => {
    return getReferenceVariableValue(props.preButtonEnable, true, (key: string) => store.get(key) ?? false);
  }, [props.preButtonEnable, store]);

  const [activePreSlideEffect, openPreSlideEffect, isValidPreSlideEffect] = useEffectElement(props.preSlideEffect);
  const [activeNextSlideEffect, openNextSlideEffect, isValidNextSlideEffect] = useEffectElement(props.nextSlideEffect);
  const [activeSubmitEffect, openSubmitEffect, isValidSubmitEffect] = useEffectElement(props.submitEffect);

  const [isPreBtnLoading, setIsPreBtnLoading] = useState(false);
  const [isNextBtnLoading, setIsNextBtnLoading] = useState(false);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  
  const hasPreSlidePermission = permission.getPermission(PermissionKey.PreviousSlide, true);
  const hasSubmitPermission = permission.getPermission(PermissionKey.SubmitSlide, true);

  const isShowPreBtn = hasPreSlidePermission && navigation.totalCount > 1;
  const isPreBtnEnabled = isShowPreBtn && !isPreBtnLoading && navigation.activeIndex > 0 && preButtonStoreEnable;
  const isNexBtnEnabled = !isNextBtnLoading && nextButtonStoreEnable;
  const isSubmitMode = navigation.activeIndex === navigation.totalCount - 1;
  const isSubmitBtnEnable = hasSubmitPermission && nextButtonStoreEnable && !isSubmitBtnLoading;

  const preButtonText = props.preButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.PreviousSlide);
  const nextButtonText = props.nextButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.NextSlide);
  const submitSlideText = props.submitButtonText ?? i18nMessageBundle.getMessage(LocaleMessageKey.SubmitSlide);

  const onPreBtnClickHandle = useCallback(
    async () => {
      if (!isValidPreSlideEffect) {
        navigation.preSlide()
        return;
      }
      try {
        setIsPreBtnLoading(true);
        await openPreSlideEffect({
          eventName: EventNames.OnPreSlide
        });
        navigation.preSlide()
        setIsPreBtnLoading(false);
      } catch (err) {
        setIsPreBtnLoading(false);
      }
    },
    // eslint-disable-next-line
    [isValidPreSlideEffect, openPreSlideEffect],
  )

  const onNextBtnClickHandle = useCallback(
    async () => {
      if (!isValidNextSlideEffect) {
        navigation.nextSlide();
        return;
      }
      try {
        setIsNextBtnLoading(true);
        await openNextSlideEffect({
          eventName: EventNames.OnNextSlide
        });
        navigation.nextSlide();
        setIsNextBtnLoading(false);
      } catch (err) {
        setIsNextBtnLoading(false);
      }
      
      navigation.nextSlide();
    },
    // eslint-disable-next-line
    [openNextSlideEffect, props.nextSlideEffect],
  )

  const onSubmitBtnClickHandle = useCallback(
    async () => {
      if (!isValidSubmitEffect) {
        return;
      }
      try {
        setIsSubmitBtnLoading(true);
        await openSubmitEffect({
          eventName: EventNames.OnSubmitSlider
        });
        setIsSubmitBtnLoading(false);
      } catch (err) {
        setIsSubmitBtnLoading(false);
      }
    },
    [isValidSubmitEffect, openSubmitEffect],
  ) 

  return (
    <div className={styles.main} onClick={props.onClick}>
      { isShowPreBtn && (
        <>
          <Button 
            round={props.preButtonStyle?.round ?? true}
            type={props.preButtonStyle?.type ?? 'info'}
            color={props.preButtonStyle?.color}
            plain={props.preButtonStyle?.plain}
            square={props.preButtonStyle?.square}
            shadow={props.preButtonStyle?.shadow}
            loading={isPreBtnLoading}
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
          loading={isNextBtnLoading}
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
      { activePreSlideEffect }
      { activeNextSlideEffect }
      { activeSubmitEffect }
    </div>
  );
}

export default ActionBar;
