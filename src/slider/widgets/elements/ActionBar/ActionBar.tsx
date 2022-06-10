import React, { useCallback, useMemo, useState } from 'react';
import { Button, ButtonSize, ButtonType } from 'react-vant';
import { SliderWidgetProps } from '../../../types/Widget';
import { LocaleMessageKey } from '../../../utils/language';
import { PermissionKey } from '../../../utils/permission';

import { useEffectElement } from '../../../hooks/useEffectElement';
import { useI18nMessageBundle } from '../../../hooks/useI18nMessageBundle';
import { usePermission } from '../../../hooks/usePermission';
import { useNavigation } from '../../../hooks/useNavigation';
import { useStore } from '../../../hooks/useStore';
import { SliderEffectElement } from '../../../types/Element';

import styles from './ActionBar.module.css';

interface ActionBarProps extends SliderWidgetProps {
  preSlideEffect?: SliderEffectElement;
  nextSlideEffect?: SliderEffectElement;
  submitEffect?: SliderEffectElement;

  nextButtonEnable?: boolean | string | string[];
  preButtonEnable?: boolean | string | string[];
  submitButtonEnable?: boolean | string | string[];

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
    if (typeof props.nextButtonEnable === 'boolean') {
      return props.nextButtonEnable;
    }
    
    if (typeof props.nextButtonEnable === 'string') {
      return !!store.get(props.nextButtonEnable);
    }
    
    if (Array.isArray(props.nextButtonEnable)) {
      return props.nextButtonEnable.some((item) => !!store.get(item));
    }

    return true;
  }, [props.nextButtonEnable, store]);

  const preButtonStoreEnable = useMemo(() => {
    if (typeof props.preButtonEnable === 'boolean') {
      return props.preButtonEnable;
    } 
    
    if (typeof props.preButtonEnable === 'string') {
      return !!store.get(props.preButtonEnable);
    }
    
    if (Array.isArray(props.preButtonEnable)) {
      return props.preButtonEnable.some((item) => !!store.get(item));
    }

    return true;
  }, [props.preButtonEnable, store]);

  const submitButtonStoreEnable = useMemo(() => {
    if (typeof props.submitButtonEnable === 'boolean') {
      return props.submitButtonEnable;
    }
    
    if (typeof props.submitButtonEnable === 'string') {
      return !!store.get(props.submitButtonEnable);
    }
    
    if (Array.isArray(props.submitButtonEnable)) {
      return props.submitButtonEnable.some((item) => !!store.get(item));
    }

    return true;
  }, [props.submitButtonEnable, store]);

  const [activePreSlideEffect, openPreSlideEffect, isValidPreSlideEffect] = useEffectElement(props.preSlideEffect);
  const [activeNextSlideEffect, openNextSlideEffect, isValidNextSlideEffect] = useEffectElement(props.nextSlideEffect);
  const [activeSubmitEffect, openSubmitEffect, isValidSubmitEffect] = useEffectElement(props.submitEffect);

  const [isPreBtnLoading, setIsPreBtnLoading] = useState(false);
  const [isNextBtnLoading, setIsNextBtnLoading] = useState(false);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  
  const hasPreSlidePermission = permission.getPermission(PermissionKey.PreviousSlide, true);
  const hasSubmitPermission = permission.getPermission(PermissionKey.SubmitSlide, true);

  const isShowPreBtn = hasPreSlidePermission;
  const isPreBtnEnabled = navigation.activeIndex > 0 && preButtonStoreEnable;
  const isNexBtnEnabled = navigation.totalCount > 0 && nextButtonStoreEnable;
  const isSubmitMode = navigation.totalCount > 0 && navigation.activeIndex === navigation.totalCount - 1;
  const isSubmitBtnEnable = hasSubmitPermission && submitButtonStoreEnable;

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
